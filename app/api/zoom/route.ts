import qs from "qs";
import axios from "axios";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

const ZOOM_TOKEN_URL = "https://zoom.us/oauth/token";

export const getZoomAccessToken = async () => {
  const storedToken = cookies().get("zoom_access_token")?.value;
  const storedExpiry = cookies().get("zoom_token_expiry")?.value;
  const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds

  // Check if token exists and is still valid
  if (storedToken && storedExpiry && parseInt(storedExpiry) > now) {
    return storedToken;
  }

  try {
    //  Token expired or missing → Fetch a new one
    const response = await axios.post(
      ZOOM_TOKEN_URL,
      qs.stringify({
        grant_type: "account_credentials",
        account_id: process.env.ZOOM_ACCOUNT_ID,
      }),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, expires_in } = response.data;
    const expiryTime = now + expires_in; // Calculate expiry timestamp
    cookies().set("zoom_access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expires_in, // Set expiration in seconds
      path: "/",
    });

    cookies().set("zoom_token_expiry", expiryTime.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expires_in,
      path: "/",
    });

    return access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

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








