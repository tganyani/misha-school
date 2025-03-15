import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") as string
  const description = searchParams.get("description") as string
  const lv = searchParams.get("level")
  const level = (lv==="primary")?"primary":((lv==="secondary")?"secondary":"university")
    try {
      return Response.json(
        await prisma.course.findMany(
          {
            where:{
              AND: [
                { title: { contains: title, mode: 'insensitive' } }, 
                { description: { contains: description, mode: 'insensitive' } }, 
                (lv!=="undefined")?{ level: {equals:level}}:{}, 
              ],
            }
          }
        )
      );
    } catch (err) {
      console.log(err);
      return Response.json({ msg: "error while fetching data" });
    }
  }

export async function POST(request: Request) {
  const  body  = await request.json();
  try {
    const course = await prisma.course.create({
      data: {
        title: body?.title,
        description: body?.description,
        level: body?.level,
        tutorId:parseInt(body?.tutorId)
      },
    });
    if (course) {
      return Response.json({id:course.id});
    }
    return Response.json({ msg: "error" });
  } catch (err) {
    console.log(err);

    return Response.json({ msg: "error will creating" });
  }
}

export async function DELETE(req: Request) {
  const { ids } = await req.json();
  try {
    const deletedCourses = await prisma.course.deleteMany({
      where: {
        id: { in: ids.map((id: any) => parseInt(id)) },
      },
    });
    return Response.json(deletedCourses);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ msg: "error" }, { status: 500 });
  }
}
