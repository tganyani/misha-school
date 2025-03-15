import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const avaliableTime = await prisma.avaliability.create({
      data: {
        userId:parseInt(body.userId),
        time: new Date(body.time),
      },
    });
    return Response.json({ created: true, id: avaliableTime.id });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("userId") as string;
    return Response.json(
      await prisma.avaliability.findMany({ where: { userId: parseInt(id) } })
    );
  } catch (err) {
    console.error(err);
    return Response.json({ error: "error" }, { status: 500 });
  }
}
