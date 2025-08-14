import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { searchParams } = new URL(req.url);
  const time = searchParams.get("time") as string
  const fromDate = time ? new Date(time) : new Date();
  try {
    return Response.json(
      await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          subjects: {
            select: {
              title: true,
              description: true,
              level: true,
              id: true,
            },
          },
          languages: {
            select: {
              name: true,
              id: true,
              level: true,
            },
          },
          availability: {
            where: {
              time: {
                gte: fromDate
              }
            },
            select: {
              id: true,
              booked: true,
              time: true,
            },
            orderBy: {
              time: "asc"
            }
          },
          tutorComments: {
            select: {
              id: true,
              text: true,
              updatedAt: true,
              student: {
                select: {
                  imagePublicId: true,
                  firstName: true,
                  lastName: true
                }
              }
            }
          },
          freeTrials: {
            select: {
              studEmail: true
            }
          }
        },
      })
    );
  } catch (err) {
    console.log(err);
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await req.json();
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: data,
    });
    return NextResponse.json({ updated: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const deletedCourse = await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });
    return Response.json(deletedCourse);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ msg: "error" }, { status: 500 });
  }
}
