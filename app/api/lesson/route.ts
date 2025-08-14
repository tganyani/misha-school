import { sendLessonBookEmail } from "@/lib/email";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") as string;
  const firstName = searchParams.get("firstName") as string;
  try {
    return Response.json(
      await prisma.lesson.findMany({
        where: {
          AND: [
            {
              student: {
                firstName: { contains: firstName, mode: "insensitive" },
              },
            },
            {
              course: {
                title: { contains: title, mode: "insensitive" },
              },
            },
          ],
        },
        include: {
          student: {
            select: {
              firstName: true,
            },
          },
          tutor: {
            select: {
              firstName: true,
            },
          },
          course: {
            select: {
              title: true,
            },
          },
          zoom: {
            select: {
              meetingId: true,
              url: true,
            },
          },
        },
      })
    );
  } catch (err) {
    console.log(err);
    return Response.json({ msg: "error while fetching data" });
  }
}

export async function DELETE(req: Request) {
  const { ids } = await req.json();
  try {
    const deletedUsers = await prisma.lesson.deleteMany({
      where: {
        id: { in: ids.map((id: any) => parseInt(id)) },
      },
    });
    return Response.json(deletedUsers);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ msg: "error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const lesson = await prisma.lesson.create({
      data: {
        startAt: new Date(body.startAt),
        studentId: parseInt(body.studentId),
        courseId: parseInt(body.courseId),
        tutorId: parseInt(body.tutorId),
      },
    });
    if (lesson) {
      await prisma.avaliability.update({
        where: {
          id: body.id,
        },
        data: {
          booked: true,
        },
      });
      await prisma.paymentPlan.update({
        where: {
          userId: parseInt(body.studentId)
        },
        data: {
          nLessonsLeft: { decrement: 1 },
        }
      })
      await sendLessonBookEmail(
        body.tutorEmail,
        body.subject,
        body.phone,
        body.description,
        body.email
      );
      return Response.json({ id: lesson.id });
    }
    return Response.json({ msg: "error" });
  } catch (err) {
    console.log(err);

    return Response.json({ msg: "error while creating" });
  }
}
