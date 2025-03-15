import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    return Response.json(
      await prisma.course.findUnique({
        where: {
          id: Number(id),
        },
      })
    );
  } catch (err) {
    console.log(err);
    return Response.json({ msg: "error while fetching data" });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data  = await req.json();
  try {
    const updatedCourse = await prisma.course.update({
      where: {
        id: parseInt(id),
      },
      data: {
        description: data?.description,
        title: data?.title,
        level: data?.level,
      },
    });
    return NextResponse.json({id:updatedCourse.id}, { status: 200 });
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
    const deletedCourse = await prisma.course.delete({
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
