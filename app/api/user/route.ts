import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    return Response.json(
      await prisma.user.findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          Role: true,
          createdAt: true,
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
      const deletedUsers = await prisma.user.deleteMany({
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
  

