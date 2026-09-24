"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { createClient, createAdminClient, createPublicClient } from "@/lib/supabase/server";

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
    console.warn("[getBlogPostsAction Error]", err);
  }

  return readLocalBlogs();
}

// Get published blogs for public /blog page
export async function getPublicBlogPostsAction(): Promise<BlogRecord[]> {
  try {
    const client = createAdminClient() || createPublicClient();
    if (client) {
      const { data, error } = await client
        .from("blogs")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data as BlogRecord[];
      }
    }
  } catch (err) {
    console.warn("[getPublicBlogPostsAction Error]", err);
  }

  return readLocalBlogs().filter((b) => b.published);
}

// Get single blog post by slug
export async function getBlogPostBySlugAction(slug: string): Promise<BlogRecord | null> {
  try {
    const client = createAdminClient() || createPublicClient();
    if (client) {
      const { data, error } = await client
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (!error && data) {
        return data as BlogRecord;
      }
    }
  } catch (err) {
    console.warn("[getBlogPostBySlugAction Error]", err);
  }

  const local = readLocalBlogs().find((b) => b.slug === slug);
  return local || null;
}

// Save (Create or Update) Blog Post
export async function saveBlogPostAction(input: BlogInput) {
  try {
    const localList = readLocalBlogs();
    const slug = input.slug?.trim() ? generateSlug(input.slug) : generateSlug(input.title);

    const record: BlogRecord = {
      id: input.id || "blog-" + Date.now(),
      created_at: new Date().toISOString(),
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

    // 1. Immediately persist locally
    if (input.id) {
      const idx = localList.findIndex((b) => b.id === input.id);
      if (idx !== -1) {
        localList[idx] = { ...localList[idx], ...record };
      } else {
        localList.unshift(record);
      }
    } else {
      localList.unshift(record);
    }
    writeLocalBlogs(localList);

    // 2. Try Supabase write
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

    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/admin/blog");
    revalidatePath("/");

    return { success: true, item: record };
  } catch (err: any) {
    console.error("[saveBlogPostAction Error]", err);
    return { success: false, error: err?.message || "Blog kaydedilemedi." };
  }
}

// Delete Blog Post
export async function deleteBlogPostAction(id: string) {
  try {
    // 1. Delete locally
    const localList = readLocalBlogs().filter((b) => b.id !== id);
    writeLocalBlogs(localList);

    // 2. Try Supabase
    try {
      const client = createAdminClient() || createPublicClient();
      if (client) {
        await client.from("blogs").delete().eq("id", id);
      }
    } catch (dbErr) {
      console.warn("[deleteBlogPostAction DB notice]", dbErr);
    }

    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    revalidatePath("/");

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Blog silinemedi." };
  }
}
