import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Lütfen bir görsel dosyası seçiniz." }, { status: 400 });
    }

    // Validate type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Desteklenmeyen dosya türü. Lütfen JPG, PNG, WEBP veya GIF yükleyiniz." },
        { status: 400 }
      );
    }

    // Validate size (max 8MB)
    const MAX_SIZE = 8 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Dosya boyutu 8MB'dan küçük olmalıdır." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const cleanFileName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.]/g, "-")
      .replace(/-+/g, "-");
    const uniqueFileName = `${Date.now()}-${cleanFileName}`;

    // 1. Try uploading to Supabase Storage if configured
    try {
      const supabaseAdmin = createAdminClient();
      if (supabaseAdmin) {
        // Try uploading to 'uploads' or 'blog-images' bucket
        const bucketName = "uploads";
        const { error: uploadError } = await supabaseAdmin.storage
          .from(bucketName)
          .upload(uniqueFileName, buffer, {
            contentType: file.type,
            upsert: true,
          });

        if (!uploadError) {
          const { data: publicUrlData } = supabaseAdmin.storage
            .from(bucketName)
            .getPublicUrl(uniqueFileName);

          if (publicUrlData?.publicUrl) {
            return NextResponse.json({
              success: true,
              url: publicUrlData.publicUrl,
              fileName: uniqueFileName,
              storage: "supabase",
            });
          }
        }
      }
    } catch (storageErr) {
      console.warn("[Supabase Storage Fallback to Local]", storageErr);
    }

    // 2. Local File System Fallback (public/uploads/)
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, uniqueFileName);
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${uniqueFileName}`;
    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: uniqueFileName,
      storage: "local",
    });
  } catch (error: any) {
    console.error("[Upload Error]", error);
    return NextResponse.json(
      { error: "Görsel yüklenirken bir hata oluştu. Lütfen tekrar deneyiniz." },
      { status: 500 }
    );
  }
}
