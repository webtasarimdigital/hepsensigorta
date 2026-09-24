import { createAdminClient, createPublicClient } from "./server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jhonhbbwoonzuchzljik.supabase.co";

/**
 * Reads a JSON file from Supabase Storage (public uploads bucket at data/[fileName]).
 * Falls back to local data if not found or unreachable.
 */
export async function readCloudJson<T>(fileName: string, localFallback: T): Promise<T> {
  // 1. Try authenticated Supabase client download
  try {
    const client = createAdminClient() || createPublicClient();
    if (client) {
      const { data, error } = await client.storage
        .from("uploads")
        .download(`data/${fileName}`);

      if (!error && data) {
        const text = await data.text();
        if (text && text.trim().length > 0) {
          return JSON.parse(text) as T;
        }
      }
    }
  } catch (err) {
    console.warn(`[storageStore read client notice for ${fileName}]`, err);
  }

  // 2. Try direct public HTTPS fetch (cache-busted, zero dependencies, infallible across all Vercel Lambdas)
  try {
    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/uploads/data/${fileName}?t=${Date.now()}`;
    const res = await fetch(publicUrl, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
    });

    if (res.ok) {
      const json = await res.json();
      return json as T;
    }
  } catch (fetchErr) {
    console.warn(`[storageStore public fetch notice for ${fileName}]`, fetchErr);
  }

  // 3. Fallback to local
  return localFallback;
}

/**
 * Writes a JSON file to Supabase Storage (public uploads bucket at data/[fileName]).
 * Persists immediately and is instantly readable across all Vercel serverless containers.
 */
export async function writeCloudJson<T>(fileName: string, data: T): Promise<boolean> {
  try {
    const client = createAdminClient() || createPublicClient();
    if (client) {
      const jsonString = JSON.stringify(data, null, 2);
      const buffer = Buffer.from(jsonString, "utf-8");

      const { error } = await client.storage
        .from("uploads")
        .upload(`data/${fileName}`, buffer, {
          contentType: "application/json",
          upsert: true,
        });

      if (!error) {
        return true;
      } else {
        console.warn(`[storageStore write error for ${fileName}]`, error.message);
      }
    }
  } catch (err) {
    console.warn(`[storageStore write exception for ${fileName}]`, err);
  }
  return false;
}
