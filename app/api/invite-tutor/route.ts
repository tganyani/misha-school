import { sendTutorInviteEmail } from "@/lib/email";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await sendTutorInviteEmail(
      body.tutorEmail,
      body.phone,
      body.description,
      body.email
    );
    return Response.json({
      msg: "email send",
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "error" }, { status: 500 });
  }
}
