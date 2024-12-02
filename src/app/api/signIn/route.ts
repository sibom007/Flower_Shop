import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import admin from "firebase-admin";

import prisma from "@/utils/prisma";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    const user = await prisma.authUser.findFirst({
      where: { email },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "password is not valid" },
        { status: 400 }
      );
    }

    // create Token
    const token = await admin.auth().createCustomToken(email);

    // make respocense for login
    const res = {
      accessToken: token,
      user: {
        username: user.username,
      },
    };

    return NextResponse.json(
      { message: "user logged in", data: res },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
