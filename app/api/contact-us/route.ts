import { sendContactUsEmail } from "@/lib/email";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, description } = await req.json();
    await sendContactUsEmail(email, description);
    return Response.json({
      msg: "email send",
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "error" }, { status: 500 });
  }
}
