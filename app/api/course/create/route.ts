import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const course = await prisma.course.create({
      data: {
        title: body?.title,
        description: body?.description,
        level: body?.level,
      },
    });
    if(course){
        return Response.json({ msg: "created", courseTitle: course.title});
    }
    return Response.json({ msg: "error"});
  } catch (err) {
    console.log(err)

    return Response.json({ msg: "error will creating" });
  }
}
