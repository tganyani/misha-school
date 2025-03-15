import prisma from "@/lib/prisma";


export async function POST(request: Request) {
  const body = await request.json();
  const data = await body.map((lesson: any) => ({
    startAt: new Date(lesson.startAt),
    studentId: Number(lesson.studentId),
    courseId: Number(lesson.courseId),
  }));
  try {
    const lesson = await prisma.lesson.createMany({
      data: data,
    });
    if (lesson) {
      return Response.json({ msg: "created" });
    }
    return Response.json({ msg: "error" });
  } catch (err) {
    console.log(err);

    return Response.json({ msg: "error while creating" });
  }
}
