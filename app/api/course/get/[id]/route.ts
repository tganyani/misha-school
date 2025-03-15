
import prisma from "@/lib/prisma";

export async function GET(request: Request,{ params }: { params: { id: string } }) {
  // const body = await request.json();
  const { id } = params;
  try {
    return Response.json(
      await prisma.course.findUnique({
        where:{
            id:Number(id)
        }
      })
    );
  } catch (err) {
    console.log(err);
    return Response.json({ msg: "error while fetching data" });
  }
}




