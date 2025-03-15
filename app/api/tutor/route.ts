import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    return Response.json(
      await prisma.user.findMany({
        select: {
          firstName: true,
          lastName: true,
          email: true,
          id: true,
          about: true,
          subjects: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      })
    );
  } catch (err) {
    console.error(err);
    return Response.json({ error: "error" }, { status: 500 });
  }
}
