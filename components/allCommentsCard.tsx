"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useMediaQuery from "@mui/material/useMediaQuery";
import { stringToColor } from "@/helper";
import { stone100 } from "@/lib/constants";
import { CommentsType } from "@/lib/user-types";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function AllCommentsCard({
  comment,
}: {
  comment: CommentsType;
}) {
  const router = useRouter();
  const [readMore, setReadMore] = useState<boolean>(false);
  const matches = useMediaQuery("(max-width:500px)");
  return (
    <Stack
      style={{
        display: "flex",
        border: `2px solid ${stone100}`,
        padding: "16px",
        borderRadius: "16px",
        width: matches ? "95vw" : "360px",
        flexDirection: "column",
        height: "fit-content",
        rowGap: "8px",
        flexShrink: 0,
        justifyContent:"space-between"
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "space-between",
        }}
      >
        {comment.student.image ? (
          <Stack sx={{ position: "relative", width: "40px", height: "40px" }}>
            <Image
              alt="student-image"
              src={comment.student.image}
              fill
              priority
              style={{ borderRadius: "20px" }}
            />
          </Stack>
        ) : (
          <Avatar
            sx={{
              bgcolor: stringToColor(
                comment.student.firstName + comment.student.lastName
              ),
              width: "40px",
              height: "40px",
            }}
          >
            {comment.student.firstName?.split("")[0]}
          </Avatar>
        )}
        <Typography variant="body1" component="div">
          {comment.student.firstName + " " + comment.student.lastName}
        </Typography>
      </Stack>
      <Typography
        variant="body2"
        component="div"
        color="GrayText"
        sx={
          readMore
            ? {}
            : {
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2, // number of lines before ellipsis
                WebkitBoxOrient: "vertical",
                whiteSpace: "normal", // allow wrapping
                flex: 1,
              }
        }
      >
        {comment.text} 
      </Typography>
      <Button
        onClick={() => setReadMore(!readMore)}
        sx={{ textTransform: "lowercase" }}
      >
        {readMore?<KeyboardArrowUpIcon />:<KeyboardArrowDownIcon/>}

      </Button>
      <Stack
        sx={{
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "space-between",
          columnGap: "8px",
          border: `2px solid ${stone100}`,

          borderRadius: "16px",
        }}
      >
        <Stack
          sx={{
            backgroundColor: "limegreen",
            width: "10px",
            height: "auto",
            borderRadius: "16px 0 0 16px",
          }}
        ></Stack>
        <Stack sx={{ flex: 1 }}>
          <Stack
            sx={{
              display: "flex",
              padding: "16px",
              flexFlow: "row nowrap",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body1" component="div">
              {comment.tutor.firstName + " " + comment.tutor.lastName}
            </Typography>
            <Stack
              sx={{
                position: "relative",
                width: "40px",
                height: "40px",
              }}
            >
              {comment.tutor.image ? (
                <Stack
                  sx={{
                    position: "relative",
                    width: "40px",
                    height: "40px",
                  }}
                >
                  <Image
                    alt="student-image"
                    src={comment.tutor.image}
                    fill
                    priority
                    style={{ borderRadius: "20px" }}
                  />
                </Stack>
              ) : (
                <Avatar
                  sx={{
                    bgcolor: stringToColor(
                      comment.tutor.firstName + comment.tutor.lastName
                    ),
                    width: "40px",
                    height: "40px",
                  }}
                >
                  {comment.tutor.firstName?.split("")[0]}
                </Avatar>
              )}
            </Stack>
          </Stack>
          <Button
            onClick={() => router.push(`/tutors/${comment.tutor.id}`)}
            sx={{ textTransform: "lowercase" }}
          >
            view tutor
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
