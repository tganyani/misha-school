import prisma from "@/lib/prisma";
import axios from "axios";
import { getZoomAccessToken } from "@/lib/helpers";


export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const accessToken = await getZoomAccessToken();
  const { id } = params;
  const { startAt, lessonId } = await req.json();
  try {
    const res = await axios.patch(
      `https://api.zoom.us/v2/meetings/${id}`,
      { start_time: startAt },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 204) {
      await prisma.lesson.update({
        where: {
          id: parseInt(lessonId),
        },
        data: {
          startAt: new Date(startAt),
        },
      });
      await prisma.zoom.update({
        where: {
          meetingId: id,
        },
        data: {
          startTime: new Date(startAt),
        },
      });
      return Response.json({ startAt }, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return Response.json({ msg: "error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const accessToken = await getZoomAccessToken();
  const { id } = params;
  try {
    const res = await axios.delete(
      `https://api.zoom.us/v2/meetings/${id}`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 204) {
      await prisma.zoom.delete({
        where: {
          meetingId: id,
        },
      });
      return Response.json({ msg: "deleted" }, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return Response.json({ msg: "error" }, { status: 500 });
  }
}
