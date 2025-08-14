import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const comment = await prisma.comment.create({
      data: {
        ...body,
        tutorId: parseInt(body.tutorId),
        studentId: parseInt(body.studentId),
      },
    });
    return Response.json({ created: true, id: comment.id });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "error" }, { status: 500 });
  }
}
