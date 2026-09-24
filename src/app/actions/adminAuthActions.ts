"use server";

import fs from "fs";
import path from "path";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createAdminClient, createPublicClient } from "@/lib/supabase/server";

const AUTH_COOKIE_NAME = "hepsen_admin_session";

const DEFAULT_USERNAMES = [
  "merve",
  "merve.dogan",
  "merve.dogan@hepsensigorta.com",
  "merve@hepsensigorta.com",
  "admin",
];

function getLocalAuthPath(): string {
  return path.join(process.cwd(), "src", "constants", "adminAuth.json");
}

function readAuthCredentials(): { username: string; password: string } {
  try {
    const filePath = getLocalAuthPath();
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(content);
      if (parsed.password) {
        return {
          username: parsed.username || "merve",
          password: parsed.password,
        };
      }
    }
  } catch (err) {
    console.warn("[readAuthCredentials Error]", err);
  }

  return {
    username: "merve",
    password: process.env.ADMIN_PASSWORD || "adminmerve",
  };
}

function writeAuthCredentials(credentials: { username: string; password: string }): void {
  try {
    const filePath = getLocalAuthPath();
    fs.writeFileSync(
      filePath,
      JSON.stringify(
        {
          username: credentials.username,
          password: credentials.password,
          updated_at: new Date().toISOString(),
        },
        null,
        2
      ),
      "utf-8"
    );
  } catch (err) {
    console.warn("[writeAuthCredentials Error]", err);
  }
}

export async function getCurrentAdminUsernameAction(): Promise<string> {
  const current = readAuthCredentials();
  return current.username || "merve";
}

export async function loginAdminAction(formData: FormData) {
  const inputUsername = (formData.get("username") as string)?.trim().toLowerCase();
  const inputPassword = (formData.get("password") as string)?.trim();

  if (!inputUsername || !inputPassword) {
    return { success: false, error: "Lütfen kullanıcı adı ve şifrenizi giriniz." };
  }

  const activeCredentials = readAuthCredentials();

  // Allow custom configured username or any standard alias
  const allowedUsernames = [
    ...DEFAULT_USERNAMES,
    activeCredentials.username.toLowerCase(),
  ];

  const isUserValid = allowedUsernames.includes(inputUsername);

  // Check against active password (or master fallback)
  const isPassValid =
    inputPassword === activeCredentials.password ||
    inputPassword === (process.env.ADMIN_PASSWORD || "adminmerve");

  if (!isUserValid || !isPassValid) {
    return {
      success: false,
      error: "Hatalı kullanıcı adı veya şifre. Lütfen bilgilerinizi kontrol ediniz.",
    };
  }

  // Set secure session cookie (expires in 7 days)
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, "authenticated_merve", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return { success: true };
}

export async function logoutAdminAction() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
  redirect("/admin/login");
}

export async function isAuthenticatedAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(AUTH_COOKIE_NAME);
  return session?.value === "authenticated_merve";
}

export async function changeAdminPasswordAction(data: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  newUsername?: string;
}): Promise<{ success: boolean; error?: string; message?: string }> {
  try {
    const active = readAuthCredentials();

    // 1. Validate current password
    const isCurrentValid =
      data.currentPassword === active.password ||
      data.currentPassword === (process.env.ADMIN_PASSWORD || "adminmerve");

    if (!isCurrentValid) {
      return { success: false, error: "Mevcut şifrenizi hatalı girdiniz." };
    }

    // 2. Validate new password
    if (!data.newPassword || data.newPassword.trim().length < 6) {
      return { success: false, error: "Yeni şifre en az 6 karakterden oluşmalıdır." };
    }

    if (data.newPassword !== data.confirmPassword) {
      return { success: false, error: "Yeni şifre ile şifre tekrarı birbiriyle eşleşmiyor." };
    }

    const updatedUsername = data.newUsername?.trim().toLowerCase() || active.username || "merve";
    const updatedPassword = data.newPassword.trim();

    // 3. Save to local storage
    writeAuthCredentials({
      username: updatedUsername,
      password: updatedPassword,
    });

    // 4. Try updating to Supabase site_settings if available
    try {
      const client = createAdminClient() || createPublicClient();
      if (client) {
        await client.from("site_settings").update({
          admin_password: updatedPassword,
          admin_username: updatedUsername,
        }).eq("id", "main");
      }
    } catch (dbErr) {
      console.warn("[changeAdminPasswordAction DB notice]", dbErr);
    }

    return {
      success: true,
      message: `Şifreniz başarıyla değiştirildi! Yeni şifrenizle giriş yapabilirsiniz. (Kullanıcı Adı: ${updatedUsername})`,
    };
  } catch (err: any) {
    console.error("[changeAdminPasswordAction Error]", err);
    return { success: false, error: err?.message || "Şifre değiştirilirken bir hata oluştu." };
  }
}
