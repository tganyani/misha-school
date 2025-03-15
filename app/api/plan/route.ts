import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const plan = await prisma.paymentPlan.upsert({
      where: {
        userId: parseInt(body.userId),
      },
      update: {
        nLessonsLeft: { increment: parseInt(body.nLesson) },
        type: body.type,
      },
      create: {
        nLessonsLeft: parseInt(body.nLesson),
        userId: parseInt(body.userId),
        type: body.type,
      },
    });
    return Response.json({ created: true, id: plan.id });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") as string;
    return Response.json(
      await prisma.paymentPlan.findUnique({
        where: {
          userId: parseInt(userId),
        },
      })
    );
  } catch (err) {
    console.error(err);
    return Response.json({ error: "error" }, { status: 500 });
  }
}
