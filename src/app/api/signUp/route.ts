import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/utils/prisma";

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

    return NextResponse.json(
      { message: "User created successfully!" },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong!";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
