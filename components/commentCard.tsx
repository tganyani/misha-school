"use client";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import { stringToColor } from "@/helper";
import { stone200, stone400 } from "@/lib/constants";
import { CommentsType } from "@/lib/user-types";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import { CldImage } from "next-cloudinary";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function CommentCard({ item }: { item: CommentsType }) {
  const matches = useMediaQuery("(max-width:500px)");
  const [readMore, setReadMore] = useState<boolean>(false);
  return (
    <Stack
      sx={{
        width: matches ? "95vw" : "500px",
        height: "fit-content",
        border: `2px solid ${stone200}`,
        padding: 2,
        "&:hover": {
          border: `2px solid ${stone400}`,
        },
        flexShrink: 0,
      }}
    >
      <Stack sx={{ display: "flex", flexFlow: "row nowrap", columnGap: 2 }}>
        <Stack
          sx={{
            border: `2px solid ${stone200}`,
            borderRadius: "20px",
            width: "40px",
            height: "40px",
            position: "relative",
            flexShrink:0
          }}
        >
          {item.student.imagePublicId ? (
            <CldImage
              src={item.student.imagePublicId}
              alt="profile Image"
              fill
              style={{ borderRadius: "20px" }}
            />
          ) : (
            <Avatar
              sx={{
                bgcolor: stringToColor(
                  item.student.firstName + item.student.lastName
                ),
                width: "40px",
                height: "40px",
              }}
            >
              {item.student.firstName?.split("")[0]}
            </Avatar>
          )}
        </Stack>

        <Stack sx={{ display: "flex", flexDirection: "column",flex:1}}>
          <Typography
            variant="body2"
            color="GrayText"
            component="div"
            sx={
              readMore
                ? { flex: 1 }
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
            {item.text}
          </Typography>
          <Button
            onClick={() => setReadMore(!readMore)}
            sx={{ textTransform: "lowercase" }}
          >
            {readMore ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </Button>
        </Stack>
      </Stack>
      <Typography variant="body2" component="div">
        {item.student.firstName + " " + item.student.lastName}
      </Typography>
    </Stack>
  );
}
