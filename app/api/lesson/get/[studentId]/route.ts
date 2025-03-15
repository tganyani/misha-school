import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { studentId: string } }
) {
  // const body = await request.json();
  const { studentId } = params;
  try {
    return Response.json(
      await prisma.lesson.findMany({
        where: {
          studentId: Number(studentId),
        },
        include: {
          course: {
            select: {
              title: true,
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
