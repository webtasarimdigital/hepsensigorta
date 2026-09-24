"use server";

import fs from "fs";
import path from "path";
import os from "os";
import { revalidatePath } from "next/cache";
import { createClient, createAdminClient, createPublicClient } from "@/lib/supabase/server";
import { readCloudJson, writeCloudJson } from "@/lib/supabase/storageStore";

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

function getLocalJsonPath(): string {
  return path.join(process.cwd(), "src", "constants", "blogs.json");
}

function getTmpJsonPath(): string {
  return path.join(os.tmpdir(), "hepsen_blogs.json");
}

function readLocalBlogs(): BlogRecord[] {
  try {
    const filePath = getLocalJsonPath();
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(content) as BlogRecord[];
    }
  } catch (err) {
    console.warn("[readLocalBlogs Error]", err);
  }
  return [];
}

function writeLocalBlogs(list: BlogRecord[]): void {
  try {
    const filePath = getLocalJsonPath();
    fs.writeFileSync(filePath, JSON.stringify(list, null, 2), "utf-8");
  } catch (err) {
    console.warn("[writeLocalBlogs Error]", err);
  }
}

// Get all blogs for Admin
export async function getBlogPostsAction(): Promise<BlogRecord[]> {
  // 1. Try Supabase Table
  try {
    const client = createAdminClient() || createPublicClient();
    if (client) {
      const { data, error } = await client
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data as BlogRecord[];
      }
    }
  } catch (err) {
    console.warn("[getBlogPostsAction DB Notice]", err);
  }

  // 2. Read from Persistent Cloud Storage (Supabase Storage data/blogs.json)
  try {
    const cloudBlogs = await readCloudJson<BlogRecord[] | null>("blogs.json", null);
    if (Array.isArray(cloudBlogs)) {
      return cloudBlogs;
    }
  } catch (cloudErr) {
    console.warn("[getBlogPostsAction Cloud Notice]", cloudErr);
  }

  // 3. Fallback to local file only if cloud is unreachable
  return readLocalBlogs();
}

// Get published blogs for public /blog page
export async function getPublicBlogPostsAction(): Promise<BlogRecord[]> {
  const all = await getBlogPostsAction();
  return all.filter((b) => b.published);
}

// Get single blog post by slug
export async function getBlogPostBySlugAction(slug: string): Promise<BlogRecord | null> {
  const all = await getBlogPostsAction();
  const normalizedSlug = decodeURIComponent(slug).toLowerCase().trim();
  const found = all.find((b) => b.slug.toLowerCase().trim() === normalizedSlug);
  return found || null;
}

// Save (Create or Update) Blog Post
export async function saveBlogPostAction(input: BlogInput) {
  try {
    const currentList = await getBlogPostsAction();
    const slug = input.slug?.trim() ? generateSlug(input.slug) : generateSlug(input.title);

    const existing = input.id ? currentList.find((b) => b.id === input.id) : null;
    const record: BlogRecord = {
      id: input.id || "blog-" + Date.now(),
      created_at: existing?.created_at || new Date().toISOString(),
      title: input.title.trim(),
      slug,
      excerpt: input.excerpt.trim(),
      content: input.content.trim(),
      category: input.category || existing?.category || "Genel",
      cover_image: input.cover_image !== undefined ? (input.cover_image || null) : (existing?.cover_image || null),
      published: input.published ?? existing?.published ?? true,
      author_name: input.author_name || existing?.author_name || "Merve DOĞAN",
      read_time: input.read_time || existing?.read_time || "4 dk",
    };

    if (input.id) {
      const idx = currentList.findIndex((b) => b.id === input.id);
      if (idx !== -1) {
        currentList[idx] = { ...currentList[idx], ...record };
      } else {
        currentList.unshift(record);
      }
    } else {
      currentList.unshift(record);
    }

    // 1. Write to Persistent Cloud Storage (Supabase Storage uploads/data/blogs.json)
    await writeCloudJson("blogs.json", currentList);

    // 2. Also write to local files & /tmp
    writeLocalBlogs(currentList);

    // 3. Try Supabase database table if configured
    try {
      const client = createAdminClient() || createPublicClient();
      if (client) {
        const payload = {
          title: record.title,
          slug: record.slug,
          excerpt: record.excerpt,
          content: record.content,
          category: record.category,
          cover_image: record.cover_image,
          published: record.published,
          author_name: record.author_name,
          read_time: record.read_time,
        };

        if (input.id) {
          const { error } = await client
            .from("blogs")
            .update(payload)
            .eq("id", input.id);
          if (error) console.warn("[Supabase blog update notice]", error.message);
        } else {
          const { error } = await client.from("blogs").insert([{ ...payload, id: record.id }]);
          if (error) console.warn("[Supabase blog insert notice]", error.message);
        }
      }
    } catch (dbErr) {
      console.warn("[saveBlogPostAction DB notice]", dbErr);
    }

    try {
      revalidatePath("/blog");
      revalidatePath(`/blog/${slug}`);
      revalidatePath("/admin/blog");
      revalidatePath("/");
    } catch {
      // outside request scope
    }

    return { success: true, item: record };
  } catch (err: any) {
    console.error("[saveBlogPostAction Error]", err);
    return { success: false, error: err?.message || "Blog kaydedilemedi." };
  }
}

// Delete Blog Post
export async function deleteBlogPostAction(id: string) {
  try {
    const currentList = await getBlogPostsAction();
    const updated = currentList.filter((b) => b.id !== id);

    // 1. Write to Persistent Cloud Storage
    await writeCloudJson("blogs.json", updated);

    // 2. Write locally
    writeLocalBlogs(updated);

    // 3. Try Supabase
    try {
      const client = createAdminClient() || createPublicClient();
      if (client) {
        await client.from("blogs").delete().eq("id", id);
      }
    } catch (dbErr) {
      console.warn("[deleteBlogPostAction DB notice]", dbErr);
    }

    try {
      revalidatePath("/blog");
      revalidatePath("/admin/blog");
      revalidatePath("/");
    } catch {
      // outside request scope
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Blog silinemedi." };
  }
}
