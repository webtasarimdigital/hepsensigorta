"use server";

import fs from "fs";
import path from "path";
import os from "os";
import { revalidatePath } from "next/cache";
import { createAdminClient, createPublicClient } from "@/lib/supabase/server";
import { readCloudJson, writeCloudJson } from "@/lib/supabase/storageStore";

export interface AnnouncementInput {
  id?: string;
  title: string;
  content: string;
  excerpt: string;
  badge?: string;
  is_featured?: boolean;
  link?: string;
  image?: string;
}

export interface AnnouncementRecord {
  id: string;
  created_at: string;
  title: string;
  content: string;
  excerpt: string;
  badge: string;
  is_featured: boolean;
  link: string | null;
  image: string | null;
}

function getLocalJsonPath(): string {
  return path.join(process.cwd(), "src", "constants", "announcements.json");
}

function getTmpJsonPath(): string {
  return path.join(os.tmpdir(), "hepsen_announcements.json");
}

function readLocalAnnouncements(): AnnouncementRecord[] {
  try {
    const filePath = getLocalJsonPath();
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(content) as AnnouncementRecord[];
    }
  } catch (err) {
    console.warn("[readLocalAnnouncements Error]", err);
  }
  return [];
}

function writeLocalAnnouncements(list: AnnouncementRecord[]): void {
  try {
    const filePath = getLocalJsonPath();
    fs.writeFileSync(filePath, JSON.stringify(list, null, 2), "utf-8");
  } catch (err) {
    console.warn("[writeLocalAnnouncements Error]", err);
  }
}

// Get all announcements for Admin
export async function getAnnouncementsAction(): Promise<AnnouncementRecord[]> {
  // 1. Try Supabase Table
  try {
    const client = createAdminClient() || createPublicClient();
    if (client) {
      const { data, error } = await client
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data as AnnouncementRecord[];
      }
    }
  } catch (err) {
    console.warn("[getAnnouncementsAction DB Notice]", err);
  }

  // 2. Read from Persistent Cloud Storage (Supabase Storage data/announcements.json)
  try {
    const cloudAnnouncements = await readCloudJson<AnnouncementRecord[] | null>("announcements.json", null);
    if (Array.isArray(cloudAnnouncements)) {
      return cloudAnnouncements;
    }
  } catch (cloudErr) {
    console.warn("[getAnnouncementsAction Cloud Notice]", cloudErr);
  }

  // 3. Fallback to local storage only if cloud is unreachable
  return readLocalAnnouncements();
}

// Get public announcements
export async function getPublicAnnouncementsAction(): Promise<AnnouncementRecord[]> {
  return getAnnouncementsAction();
}

// Save (Create or Update) Announcement
export async function saveAnnouncementAction(input: AnnouncementInput) {
  try {
    const currentList = await getAnnouncementsAction();

    const existing = input.id ? currentList.find((i) => i.id === input.id) : null;
    const record: AnnouncementRecord = {
      id: input.id || "ann-" + Date.now(),
      created_at: existing?.created_at || new Date().toISOString(),
      title: input.title.trim(),
      excerpt: input.excerpt.trim(),
      content: input.content.trim(),
      badge: input.badge || existing?.badge || "Duyuru",
      is_featured: input.is_featured ?? existing?.is_featured ?? false,
      link: input.link !== undefined ? (input.link?.trim() || null) : (existing?.link || null),
      image: input.image !== undefined ? (input.image?.trim() || null) : (existing?.image || null),
    };

    if (input.id) {
      const index = currentList.findIndex((i) => i.id === input.id);
      if (index !== -1) {
        currentList[index] = { ...currentList[index], ...record };
      } else {
        currentList.unshift(record);
      }
    } else {
      currentList.unshift(record);
    }

    // 1. Write to Persistent Cloud Storage
    await writeCloudJson("announcements.json", currentList);

    // 2. Write locally
    writeLocalAnnouncements(currentList);

    // 3. Try Supabase table
    try {
      const client = createAdminClient() || createPublicClient();
      if (client) {
        const payload = {
          title: record.title,
          excerpt: record.excerpt,
          content: record.content,
          badge: record.badge,
          is_featured: record.is_featured,
          link: record.link,
          image: record.image,
        };

        if (input.id) {
          const { error } = await client
            .from("announcements")
            .update(payload)
            .eq("id", input.id);
          if (error) console.warn("[Supabase announcement update notice]", error.message);
        } else {
          const { error } = await client.from("announcements").insert([{ ...payload, id: record.id }]);
          if (error) console.warn("[Supabase announcement insert notice]", error.message);
        }
      }
    } catch (dbErr) {
      console.warn("[saveAnnouncementAction DB notice]", dbErr);
    }

    try {
      revalidatePath("/duyurular");
      revalidatePath("/admin/announcements");
      revalidatePath("/");
    } catch {
      // outside request scope
    }

    return { success: true, item: record };
  } catch (err: any) {
    console.error("[saveAnnouncementAction Error]", err);
    return { success: false, error: err?.message || "Duyuru kaydedilemedi." };
  }
}

// Delete Announcement
export async function deleteAnnouncementAction(id: string) {
  try {
    const currentList = await getAnnouncementsAction();
    const updated = currentList.filter((i) => i.id !== id);

    // 1. Write to Persistent Cloud Storage
    await writeCloudJson("announcements.json", updated);

    // 2. Write locally
    writeLocalAnnouncements(updated);

    // 3. Try Supabase
    try {
      const client = createAdminClient() || createPublicClient();
      if (client) {
        await client.from("announcements").delete().eq("id", id);
      }
    } catch (dbErr) {
      console.warn("[deleteAnnouncementAction DB notice]", dbErr);
    }

    try {
      revalidatePath("/duyurular");
      revalidatePath("/admin/announcements");
      revalidatePath("/");
    } catch {
      // outside request scope
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Duyuru silinemedi." };
  }
}
