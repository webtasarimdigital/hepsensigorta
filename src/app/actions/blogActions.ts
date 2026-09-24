"use server";

import { createClient, createAdminClient, createPublicClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export interface BlogInput {
  id?: string;
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  category: string;
  cover_image?: string;
  published: boolean;
  author_name?: string;
  read_time?: string;
}

export interface BlogRecord {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  cover_image: string | null;
  published: boolean;
  author_name: string;
  read_time: string;
}

function generateSlug(text: string): string {
  const trMap: { [key: string]: string } = {
    ç: "c", Ç: "c", ğ: "g", Ğ: "g", ı: "i", İ: "i", ö: "o", Ö: "o", ş: "s", Ş: "s", ü: "u", Ü: "u",
  };
  return text
    .toLowerCase()
    .replace(/[çğışöüÇĞİŞÖÜ]/g, (match) => trMap[match] || match)
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Get all blogs for Admin
export async function getBlogPostsAction(): Promise<BlogRecord[]> {
  try {
    const client = createAdminClient() || createPublicClient();
    if (!client) return [];

    const { data, error } = await client
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("[getBlogPostsAction Error]", error.message);
      return [];
    }

    return (data as BlogRecord[]) || [];
  } catch (err) {
    console.warn("[getBlogPostsAction Error]", err);
    return [];
  }
}

// Get published blogs for public /blog page
export async function getPublicBlogPostsAction(): Promise<BlogRecord[]> {
  try {
    const client = createAdminClient() || createPublicClient();
    if (!client) return [];

    const { data, error } = await client
      .from("blogs")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("[getPublicBlogPostsAction Error]", error.message);
      return [];
    }

    return (data as BlogRecord[]) || [];
  } catch (err) {
    console.warn("[getPublicBlogPostsAction Error]", err);
    return [];
  }
}

// Get single blog post by slug
export async function getBlogPostBySlugAction(slug: string): Promise<BlogRecord | null> {
  try {
    const client = createAdminClient() || createPublicClient();
    if (!client) return null;

    const { data, error } = await client
      .from("blogs")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      return null;
    }

    return (data as BlogRecord) || null;
  } catch {
    return null;
  }
}

// Save (Create or Update) Blog Post
export async function saveBlogPostAction(input: BlogInput) {
  try {
    const supabaseAdmin = createAdminClient();
    const supabaseClient = await createClient();
    const client = supabaseAdmin || supabaseClient;

    if (!client) {
      return { success: false, error: "Veritabanı bağlantısı yapılamadı. Supabase bilgilerini kontrol ediniz." };
    }

    const slug = input.slug?.trim() ? generateSlug(input.slug) : generateSlug(input.title);

    const payload = {
      title: input.title.trim(),
      slug,
      excerpt: input.excerpt.trim(),
      content: input.content.trim(),
      category: input.category || "Genel",
      cover_image: input.cover_image || null,
      published: input.published ?? true,
      author_name: input.author_name || "Merve DOĞAN",
      read_time: input.read_time || "4 dk",
    };

    if (input.id) {
      // Update existing
      const { error } = await client
        .from("blogs")
        .update(payload)
        .eq("id", input.id);

      if (error) throw error;
    } else {
      // Create new
      const { error } = await client.from("blogs").insert([payload]);
      if (error) throw error;
    }

    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/admin/blog");

    return { success: true };
  } catch (err: any) {
    console.error("[saveBlogPostAction Error]", err);
    return { success: false, error: err.message || "Blog kaydedilemedi." };
  }
}

// Delete Blog Post
export async function deleteBlogPostAction(id: string) {
  try {
    const supabaseAdmin = createAdminClient();
    const supabaseClient = await createClient();
    const client = supabaseAdmin || supabaseClient;

    if (!client) return { success: false, error: "Veritabanı bağlantısı yok." };

    const { error } = await client.from("blogs").delete().eq("id", id);
    if (error) throw error;

    revalidatePath("/blog");
    revalidatePath("/admin/blog");

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
