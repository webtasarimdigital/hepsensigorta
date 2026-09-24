"use server";

import fs from "fs";
import path from "path";
import os from "os";
import { revalidatePath } from "next/cache";
import { createAdminClient, createPublicClient } from "@/lib/supabase/server";

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
  let list: AnnouncementRecord[] = [];
  try {
    const filePath = getLocalJsonPath();
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      list = JSON.parse(content) as AnnouncementRecord[];
    }
  } catch (err) {
    console.warn("[readLocalAnnouncements Error]", err);
  }

  try {
    const tmpPath = getTmpJsonPath();
    if (fs.existsSync(tmpPath)) {
      const content = fs.readFileSync(tmpPath, "utf-8");
      const tmpList = JSON.parse(content) as AnnouncementRecord[];
      const existingIds = new Set(list.map((l) => l.id));
      for (const item of tmpList) {
        if (!existingIds.has(item.id)) list.push(item);
      }
    }
  } catch (tmpErr) {
    console.warn("[readTmpAnnouncements Error]", tmpErr);
  }

  return list;
}

function writeLocalAnnouncements(list: AnnouncementRecord[]): void {
  try {
    const filePath = getLocalJsonPath();
    fs.writeFileSync(filePath, JSON.stringify(list, null, 2), "utf-8");
  } catch (err) {
    console.warn("[writeLocalAnnouncements Error]", err);
  }

  try {
    const tmpPath = getTmpJsonPath();
    fs.writeFileSync(tmpPath, JSON.stringify(list, null, 2), "utf-8");
  } catch (tmpErr) {
    console.warn("[writeTmpAnnouncements Error]", tmpErr);
  }
}

// Get all announcements for Admin
export async function getAnnouncementsAction(): Promise<AnnouncementRecord[]> {
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
    console.warn("[getAnnouncementsAction Error]", err);
  }

  // Fallback to local storage
  return readLocalAnnouncements();
}

// Get public announcements
export async function getPublicAnnouncementsAction(): Promise<AnnouncementRecord[]> {
  return getAnnouncementsAction();
}

// Save (Create or Update) Announcement
export async function saveAnnouncementAction(input: AnnouncementInput) {
  try {
    const localList = readLocalAnnouncements();

    const record: AnnouncementRecord = {
      id: input.id || "ann-" + Date.now(),
      created_at: new Date().toISOString(),
      title: input.title.trim(),
      excerpt: input.excerpt.trim(),
      content: input.content.trim(),
      badge: input.badge || "Duyuru",
      is_featured: input.is_featured ?? false,
      link: input.link?.trim() || null,
      image: input.image?.trim() || null,
    };

    // 1. Immediately persist locally (zero lag, infallible)
    if (input.id) {
      const index = localList.findIndex((i) => i.id === input.id);
      if (index !== -1) {
        localList[index] = { ...localList[index], ...record };
      } else {
        localList.unshift(record);
      }
    } else {
      localList.unshift(record);
    }
    writeLocalAnnouncements(localList);

    // 2. Try Supabase write
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

    revalidatePath("/duyurular");
    revalidatePath("/admin/announcements");
    revalidatePath("/");

    return { success: true, item: record };
  } catch (err: any) {
    console.error("[saveAnnouncementAction Error]", err);
    return { success: false, error: err?.message || "Duyuru kaydedilemedi." };
  }
}

// Delete Announcement
export async function deleteAnnouncementAction(id: string) {
  try {
    // 1. Delete locally
    const localList = readLocalAnnouncements().filter((i) => i.id !== id);
    writeLocalAnnouncements(localList);

    // 2. Try Supabase
    try {
      const client = createAdminClient() || createPublicClient();
      if (client) {
        await client.from("announcements").delete().eq("id", id);
      }
    } catch (dbErr) {
      console.warn("[deleteAnnouncementAction DB notice]", dbErr);
    }

    revalidatePath("/duyurular");
    revalidatePath("/admin/announcements");
    revalidatePath("/");

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Duyuru silinemedi." };
  }
}
