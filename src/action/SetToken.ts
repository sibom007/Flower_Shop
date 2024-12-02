"use server";

import { cookies } from "next/headers";

export const SetToken = async ({ token }: { token: string }) => {
  (await cookies()).set("accesstoken", token);
};
