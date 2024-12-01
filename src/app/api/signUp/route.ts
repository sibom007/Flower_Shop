import admin from "firebase-admin";

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
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
    const { email, username, password } = body;

    if (!email || !password || !username) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    const userCredential = await admin.auth().createUser({
      email: email,
      password: password,
    });

    const existUser = await prisma.authUser.findFirst({ where: { email } });

    if (existUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashPassword = await bcrypt.hash(
      password,
      Number(process.env.NEXT_PUBLIC_PASSWORD_SALT)
    );

    const newUser = await prisma.authUser.create({
      data: {
        email,
        password: hashPassword,
        username,
        emailVerify: false,
        role: "USER",
      },
      select: {
        username: true,
        email: true,
        id: true,
      },
    });

    await prisma.userInfo.create({
      data: {
        userId: newUser.id,
      },
    });

    const response = {
      id: newUser.id,
      email: userCredential.email,
      username: newUser.username,
    };

    return NextResponse.json(
      { message: "User created successfully!", response },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong!";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
