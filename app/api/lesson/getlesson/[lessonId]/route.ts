import prisma from "@/lib/prisma";


export async function GET(
  request: Request,
  { params }: { params: { lessonId: string } }
) {
  // const body = await request.json();
  const { lessonId } = params;
  try {
    return Response.json(
      await prisma.lesson.findUnique({
        where: {
          id: Number(lessonId),
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
