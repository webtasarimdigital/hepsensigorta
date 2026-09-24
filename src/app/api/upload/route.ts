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

    // Validate and normalize MIME type
    let mimeType = (file.type || "").toLowerCase().split(";")[0].trim();
    if (!mimeType || mimeType === "application/octet-stream") {
      const ext = path.extname(file.name || "").toLowerCase();
      if (ext === ".webp") mimeType = "image/webp";
      else if (ext === ".jpg" || ext === ".jpeg") mimeType = "image/jpeg";
      else if (ext === ".png") mimeType = "image/png";
      else if (ext === ".gif") mimeType = "image/gif";
      else if (ext === ".svg") mimeType = "image/svg+xml";
      else if (ext === ".avif") mimeType = "image/avif";
      else if (ext === ".bmp") mimeType = "image/bmp";
    }
    if (mimeType === "image/jpg") mimeType = "image/jpeg";

    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml",
      "image/avif",
      "image/bmp",
    ];
    if (!validTypes.includes(mimeType)) {
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
        const bucketName = "uploads";
        let { error: uploadError } = await supabaseAdmin.storage
          .from(bucketName)
          .upload(uniqueFileName, buffer, {
            contentType: mimeType,
            upsert: true,
          });

        // If bucket does not exist or upload had bucket error, try creating the bucket
        if (uploadError && (uploadError.message?.toLowerCase().includes("bucket") || (uploadError as any).statusCode === "404")) {
          try {
            await supabaseAdmin.storage.createBucket(bucketName, { public: true, fileSizeLimit: 10485760 });
            const retry = await supabaseAdmin.storage
              .from(bucketName)
              .upload(uniqueFileName, buffer, {
                contentType: mimeType,
                upsert: true,
              });
            uploadError = retry.error;
          } catch (createErr) {
            console.warn("[Supabase Create Bucket Attempt]", createErr);
          }
        }

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
        } else {
          console.warn("[Supabase Upload Warning]", uploadError.message);
        }
      }
    } catch (storageErr) {
      console.warn("[Supabase Storage Fallback to Local]", storageErr);
    }

    // 2. Local File System Fallback (public/uploads/)
    try {
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
    } catch (fsErr) {
      console.warn("[Local File System Notice, falling back to base64 Data URL]", fsErr);
    }

    // 3. Bulletproof Base64 Data URL Fallback (works on Vercel and any serverless runtime)
    const base64Data = buffer.toString("base64");
    const dataUrl = `data:${mimeType};base64,${base64Data}`;
    return NextResponse.json({
      success: true,
      url: dataUrl,
      fileName: uniqueFileName,
      storage: "base64",
    });
  } catch (error: any) {
    console.error("[Upload Error]", error);
    return NextResponse.json(
      { error: "Görsel yüklenirken bir hata oluştu: " + (error?.message || "Lütfen tekrar deneyiniz.") },
      { status: 500 }
    );
  }
}
