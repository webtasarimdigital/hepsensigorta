"use server";

import { createClient, createAdminClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export interface AnnouncementInput {
  id?: string;
  title: string;
  content: string;
  excerpt: string;
  badge?: string;
  is_featured?: boolean;
  link?: string;
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
}

// Get all announcements for Admin
export async function getAnnouncementsAction(): Promise<AnnouncementRecord[]> {
  try {
    const supabaseAdmin = createAdminClient();
    const supabaseClient = await createClient();
    const client = supabaseAdmin || supabaseClient;

    if (!client) return [];

    const { data, error } = await client
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("[getAnnouncementsAction Error]", error.message);
      return [];
    }

    return (data as AnnouncementRecord[]) || [];
  } catch (err) {
    console.warn("[getAnnouncementsAction Error]", err);
    return [];
  }
}

// Get public announcements
export async function getPublicAnnouncementsAction(): Promise<AnnouncementRecord[]> {
  try {
    const supabaseAdmin = createAdminClient();
    const supabaseClient = await createClient();
    const client = supabaseAdmin || supabaseClient;

    if (!client) return [];

    const { data, error } = await client
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("[getPublicAnnouncementsAction Error]", error.message);
      return [];
    }

    return (data as AnnouncementRecord[]) || [];
  } catch (err) {
    console.warn("[getPublicAnnouncementsAction Error]", err);
    return [];
  }
}

// Save (Create or Update) Announcement
export async function saveAnnouncementAction(input: AnnouncementInput) {
  try {
    const supabaseAdmin = createAdminClient();
    const supabaseClient = await createClient();
    const client = supabaseAdmin || supabaseClient;

    if (!client) {
      return { success: false, error: "Veritabanı bağlantısı yapılamadı. Supabase bilgilerini kontrol ediniz." };
    }

    const payload = {
      title: input.title.trim(),
      excerpt: input.excerpt.trim(),
      content: input.content.trim(),
      badge: input.badge || "Duyuru",
      is_featured: input.is_featured ?? false,
      link: input.link?.trim() || null,
    };

    if (input.id) {
      const { error } = await client
        .from("announcements")
        .update(payload)
        .eq("id", input.id);

      if (error) throw error;
    } else {
      const { error } = await client.from("announcements").insert([payload]);
      if (error) throw error;
    }

    revalidatePath("/duyurular");
    revalidatePath("/admin/announcements");
    revalidatePath("/");

    return { success: true };
  } catch (err: any) {
    console.error("[saveAnnouncementAction Error]", err);
    return { success: false, error: err.message || "Duyuru kaydedilemedi." };
  }
}

// Delete Announcement
export async function deleteAnnouncementAction(id: string) {
  try {
    const supabaseAdmin = createAdminClient();
    const supabaseClient = await createClient();
    const client = supabaseAdmin || supabaseClient;

    if (!client) return { success: false, error: "Veritabanı bağlantısı yok." };

    const { error } = await client.from("announcements").delete().eq("id", id);
    if (error) throw error;

    revalidatePath("/duyurular");
    revalidatePath("/admin/announcements");
    revalidatePath("/");

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
