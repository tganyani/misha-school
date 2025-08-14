import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const subject = searchParams.get("subject")
      ? (searchParams.get("subject") as string)
      : "";
    const level = searchParams.get("level") as string;

    const levelValue =
      level === "primary"
        ? "primary"
        : level === "secondary"
        ? "secondary"
        : "university";
    return Response.json(
      await prisma.user.findMany({
        where: {
          subjects: {
            some: {
              AND: [
                {
                  title: {
                    contains: subject,
                    mode: "insensitive",
                  },
                },
                level ? { level: { equals: levelValue } } : {},
              ],
            },
          },
        },
        select: {
          firstName: true,
          lastName: true,
          email: true,
          id: true,
          about: true,
          imagePublicId: true,
          subjects: {
            select: {
              id: true,
              title: true,
            },
          },
          freeTrials: {
            select: {
              studEmail: true,
            },
          },
          availability: {
            take: 1,
            where: {
              time: {
                gte: new Date(),
              },
            },
            select: {
              id: true,
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
