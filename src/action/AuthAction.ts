import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { auth } from "@/firebase/config";
import { SetToken } from "./setToken";

export async function signUpUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export async function signInUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await SetToken({
      token: (user as User & { accessToken: string }).accessToken,
    });

    return user;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
