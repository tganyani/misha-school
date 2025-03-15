import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function POST(request: Request) {
  const body = await request.json();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(body.password, salt);
  const found = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
    select: {
      email: true,
    },
  });
  if (found) {
    return Response.json({ error: "user email already taken" }, { status: 403 });
  }
  
  try {
    const user = await prisma.user.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: hash,
      },
    });
    return Response.json({ message: "user created" }, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
