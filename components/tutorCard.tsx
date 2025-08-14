"use client";
import useMediaQuery from "@mui/material/useMediaQuery";
import { stone100, stone200, stone400 } from "@/lib/constants";
import { userProfileType } from "@/lib/user-types";
import { Typography, Chip, Rating, Button, Avatar, Stack } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleIcon from "@mui/icons-material/People";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FreeBookModal from "./freeBookModal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { stringToColor } from "@/helper";
import { CldImage } from "next-cloudinary";
import { useSession } from "next-auth/react";

export default function TutorCard({ user }: { user: userProfileType }) {
  const matches = useMediaQuery("(max-width:500px)");
  const router = useRouter();
  const { data: session } = useSession();
  const [value, setValue] = useState<number | null>(2);
  return (
    <div
      key={user.id}
      style={{
        display: "flex",
        border: `2px solid ${stone100}`,
        padding: "16px",
        borderRadius: "16px",
        width: matches ? "95vw" : "360px",
        flexDirection: "column",
        height: "380px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "8px",
          flex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            flexFlow: "row nowrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <Stack
            sx={{
              borderRadius: "20px",
              width: "40px",
              height: "40px",
              position: "relative",
            }}
          >
            {user.imagePublicId ? (
              <CldImage
                src={user.imagePublicId}
                alt="profile Image"
                fill
                style={{ borderRadius: "20px" }}
              />
            ) : (
              <Avatar
                sx={{
                  bgcolor: stringToColor(user.firstName + user.lastName),
                  width: "40px",
                  height: "40px",
                }}
              >
                {user.firstName?.split("")[0]}
              </Avatar>
            )}
          </Stack>
          <Typography component="div" variant="body1">
            {user.firstName} {user.lastName}
          </Typography>

          <Stack
           onClick={() => router.push(`/tutors/${user.id}`)}
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexFlow: "row nowrap",
              width: "160px",
              border: `2px solid ${
                user?.availability[0]?.id ? "limegreen" : stone200
              }`,
              padding: "2px",
              borderRadius: "16px",
              "&:hover":{
                padding:"3px"
              }
            }}
          >
            <CalendarMonthIcon style={{ fontSize: "14px", color: user?.availability[0]?.id?"limegreen":stone400 }} />
            <Typography component="div" variant="body2" color="GrayText">
              
              {
                user?.availability[0]?.id?"Available":"Unavailable"
              }
            </Typography>
          </Stack>
        </div>
        <div
          style={{
            display: "flex",
            flexFlow: "row nowrap",
            rowGap: "8px",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <PeopleIcon style={{ fontSize: "14px", color: "grey" }} />
          <Typography component="div" variant="body2">
            1203 lessons- helped 233 students
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            flexFlow: "row nowrap",
            rowGap: "8px",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <EmojiEventsIcon style={{ fontSize: "14px", color: "grey" }} />
          <Typography component="div" variant="body2">
            3+years teaching at MishaStudent
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            gap: "8px",
            width: "100%",
            overflowX: "auto",
          }}
        >
          {user.subjects?.map((sub) => (
            <Chip size="small" label={sub.title} key={sub.id} />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "space-between",
          }}
        >
          <Typography component="div" variant="body2">
            $20 - $30 / lesson
          </Typography>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Typography
            color="GrayText"
            component="div"
            variant="body2"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3, // number of lines before ellipsis
              WebkitBoxOrient: "vertical",
              whiteSpace: "normal", // allow wrapping
            }}
          >
            {user.about}
          </Typography>
        </div>
        <Button
          size="small"
          onClick={() => router.push(`/tutors/${user.id}`)}
          sx={{ textTransform: "lowercase" }}
        >
          read more
        </Button>

        {user?.freeTrials.some(
          (trial: { studEmail: string }) =>
            trial.studEmail === session?.user.email
        ) ? (
          <Button
            onClick={() => router.push(`/tutors/${user.id}`)}
            variant="contained"
            sx={{
              textTransform: "lowercase",
              backgroundColor: "limegreen",
            }}
          >
            book now
          </Button>
        ) : (
          <FreeBookModal
            courses={user.subjects}
            tutorName={user.firstName + " " + user.lastName}
            tutorEmail={user.email}
            tutorId={user.id}
          />
        )}
      </div>
    </div>
  );
}
