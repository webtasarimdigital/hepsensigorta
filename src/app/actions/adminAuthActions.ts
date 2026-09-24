"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const VALID_USERNAMES = [
  "merve",
  "merve.dogan",
  "merve.dogan@hepsensigorta.com",
  "merve@hepsensigorta.com",
  "admin",
];

const VALID_PASSWORD = process.env.ADMIN_PASSWORD || "adminmerve";
const AUTH_COOKIE_NAME = "hepsen_admin_session";

export async function loginAdminAction(formData: FormData) {
  const username = (formData.get("username") as string)?.trim().toLowerCase();
  const password = (formData.get("password") as string)?.trim();

  if (!username || !password) {
    return { success: false, error: "Lütfen kullanıcı adı ve şifrenizi giriniz." };
  }

  const isUserValid = VALID_USERNAMES.includes(username);
  const isPassValid = password === VALID_PASSWORD;

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
