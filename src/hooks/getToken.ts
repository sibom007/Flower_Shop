"use server";
import { cookies } from "next/headers";

export const getToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("No token found");

  return token;
};
