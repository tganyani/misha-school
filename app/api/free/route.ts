import { sendLessonFreeTrialEmail } from "@/lib/email";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const free = await prisma.freeTrial.create({
      data: {
        studEmail: body.email,
        tutorId: parseInt(body.tutorId),
      },
    });
    await sendLessonFreeTrialEmail(
      body.tutorEmail,
      body.subject,
      body.phone,
      body.description,
      body.email
    );
    return Response.json({ id: free.id });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "error" }, { status: 500 });
  }
}
