import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  // const body = await request.json();
  try {
    return Response.json(
      await prisma.course.findMany({
        where: {
          level: "primary",
        },
      })
    );
  } catch (err) {
    console.log(err);
    return Response.json({ msg: "error while fetching data" });
  }
}
