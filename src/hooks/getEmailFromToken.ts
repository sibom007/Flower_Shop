import { auth } from "firebase-admin";
import { getToken } from "./getToken";

export async function getEmail() {
  const token = await getToken();
  try {
    const decodedToken = await auth().verifySessionCookie(token);
    const user = await auth().getUser(decodedToken.uid);
    return user;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
}
