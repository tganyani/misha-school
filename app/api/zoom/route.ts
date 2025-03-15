import qs from "qs";
import axios from "axios";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

import { getZoomAccessToken } from "@/lib/helpers";


export async function POST(request: Request) {
  try {
    const access_token = await getZoomAccessToken()
    const body = await request.json();
    const res = await axios.post(
      "https://api.zoom.us/v2/users/me/meetings",
      {
        topic: body?.title,
        type: 2, // Scheduled meeting
        start_time: body?.startAt,
        duration: 45,
        timezone: "UTC",
        settings: {
          host_video: true,
          participant_video: true,
          mute_upon_entry: true,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );
      const meeting  = await prisma.zoom.create({
        data:{
          meetingId:String(res.data.id),
          topic:res.data.topic,
          type:res.data.type,
          startTime:res.data.start_time,
          duration:res.data.duration,
          url:res.data.join_url,
          lessonId:body.lessonId,
          studentId:body.studentId,
          tutorId:body?.tutorId
        }
      })
      return Response.json({msg:"created",id:meeting?.id});

  } catch (err) {
    console.log(err);
    return Response.json({ msg: "error while creating the meeting" });
  }
}








