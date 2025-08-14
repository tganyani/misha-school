import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { role, id } = await req.json();
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { Role: role },
    });

    return NextResponse.json({ success: true,Role:updatedUser.Role });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ msg: "error" }, { status: 500 });
  }
}
