import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/email";
import { generateVerificationCode } from "generate-verification-code";

export async function POST(req: Request) {
  try {
    const { email, password, firstName, Role, lastName } = await req.json();
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        verified: true,
      },
    });
    if (existingUser) {
      return Response.json({ err: "Email already in use", created: false });
    }
    const unverifiedUser = await prisma.user.findFirst({
      where: {
        email,
        verified: false,
      },
    });
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = generateVerificationCode({
      length: 6,
      type: "string",
    });
    const hashedVerificationCode = await bcrypt.hash(
      verificationCode as string,
      10
    );
    if (unverifiedUser) {
      await sendVerificationEmail(email, verificationCode as string);
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          verificationCode: hashedVerificationCode,
          password: hashedPassword,
        },
      });
      return Response.json({
        msg: "Verification code sent to email",
        created: true,
        email,
        err: "",
      });
    }
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        verificationCode: hashedVerificationCode,
        firstName,
        lastName,
        Role,
      },
    });
    await sendVerificationEmail(email, verificationCode as string);
    return Response.json({
      msg: "Verification code sent to email",
      created: true,
      email,
      id: user.id,
      err: "",
    });
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
