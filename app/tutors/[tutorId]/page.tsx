"use client";
import { useSession } from "next-auth/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams } from "next/navigation";
import {
  Stack,
  Typography,
  Button,
  Divider,
  TextField,
  Avatar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import useSWR from "swr";
import { userProfileType } from "@/lib/user-types";
import LoadingData from "@/components/loading-d";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { CldImage } from "next-cloudinary";
dayjs.extend(localizedFormat);

import { fetcher, stringToColor } from "@/helper";
import BookModal from "@/components/bookModal";
import { stone100, stone200, stone400 } from "@/lib/constants";
import { useEffect, useState } from "react";
import axios from "axios";
import FreeBookModal from "@/components/freeBookModal";
import InviteTutorModal from "@/components/inviteTutorModal";
import CommentCard from "@/components/commentCard";

export default function Tutor() {
  const [loading, setLoading] = useState<boolean>(false);
  const [nlessons, setNlessons] = useState<number>(0);
  const { data: session } = useSession();
  const matches = useMediaQuery("(max-width:650px)");
  const { tutorId } = useParams();
  const [text, setText] = useState<string>("");
  const [currentTime, setCurrenttime] = useState<Date>(new Date());
  const { data, error, isLoading, mutate } = useSWR<userProfileType>(
    `/api/user/${tutorId}?time${currentTime}`,
    fetcher
  );
  useEffect(() => {
    const fetchPlan = async () => {
      await axios
        .get(`/api/plan?userId=${session?.user.id}`)
        .then(({ data }) => {
          setNlessons(data?.nLessonsLeft);
        })
        .catch((err) => console.error(err));
    };
    fetchPlan();
  }, [data]);
  const handleAddComment = async () => {
    setLoading(true);
    await axios
      .post("/api/comment", {
        text,
        studentId: session?.user.id,
        tutorId: data?.id,
      })
      .then(({ data }) => {
        if (data.created) {
          mutate();
          setText("");
        }
      })
      .catch((err) => console.error(err));
    setLoading(false);
  };
  if (isLoading) return <LoadingData />;
  if (error) return <div>failed to load data</div>;
  if (!data) return null;
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "20px",
        px: 1,
        mb: 2,
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexFlow: "row nowrap",
          // justifyContent: "space-between",
        }}
      >
        <Stack sx={{}}>
          <Typography variant="body1" component="div">
            {data?.firstName} ,{data?.lastName}
          </Typography>
          <Typography color="GrayText" variant="body2" component="div">
            {" "}
            {data?.country},{data?.hLeducation}
          </Typography>
        </Stack>
        <Stack
          sx={{
            border: `2px solid ${stone200}`,
            borderRadius: "20px",
            width: "40px",
            height: "40px",
            position: "relative",
          }}
        >
          {data.imagePublicId ? (
            <CldImage
              src={data.imagePublicId}
              alt="profile Image"
              fill
              style={{ borderRadius: "20px" }}
            />
          ) : (
            <Avatar
              sx={{
                bgcolor: stringToColor(data.firstName + data.lastName),
                width: "40px",
                height: "40px",
              }}
            >
              {data.firstName?.split("")[0]}
            </Avatar>
          )}
        </Stack>
      </Stack>
      {/* Bookable Time */}
      <div>
        <Typography variant="body1" component="div">
          Bookable time
        </Typography>
        {data.availability.length > 0 ? (
          <Stack sx={{ display: "flex", flexFlow: "row wrap", gap: "8px" }}>
            {data?.availability.map((item) => (
              <Stack
                key={item.id}
                sx={{
                  backgroundColor: "#F5F5F4",
                  width: "fit-content",
                  padding: "8px",
                  borderRadius: "12px",
                }}
              >
                <Typography variant="body2" component="div">
                  {dayjs(item.time).format("ll")}
                </Typography>

                <Typography variant="body2" component="div">
                  {dayjs(item.time).format("LT")}-{" "}
                  {dayjs(item.time).add(1, "h").format("LT")}
                </Typography>
                <Stack sx={{ display: "flex", flexFlow: "row nowrap" }}>
                  {data.freeTrials.some(
                    (trial) => trial.studEmail === session?.user.email
                  ) ? (
                    <BookModal
                      courses={data.subjects}
                      tutorId={data.id}
                      tutorEmail={data.email}
                      tutorName={data.firstName + " " + data.lastName}
                      startAt={item.time}
                      id={item.id}
                      booked={item.booked}
                      nlessons={nlessons}
                    />
                  ) : (
                    <FreeBookModal
                      courses={data?.subjects}
                      tutorName={data?.firstName + " " + data?.lastName}
                      tutorEmail={data?.email}
                      tutorId={data?.id}
                    />
                  )}
                </Stack>
              </Stack>
            ))}
          </Stack>
        ) : (
          <Stack
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "8px",
              border: `2px solid ${stone100}`,
              padding: "12px",
            }}
          >
            <Typography variant="body2" component="div">
              No bookable time
            </Typography>
            <InviteTutorModal
              tutorName={data?.firstName + " " + data?.lastName}
              tutorEmail={data?.email}
            />
          </Stack>
        )}
      </div>
      {/* About */}
      <div>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body1" component="div">
            About
          </Typography>
        </Stack>
        <Typography variant="body2" color="GrayText" component="div">
          {data?.about}
        </Typography>
      </div>
      {/* Subject */}
      <div>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body1" component="div">
            Subjects
          </Typography>
        </Stack>
        <Stack sx={{ display: "flex", flexFlow: "row wrap", gap: "8px" }}>
          {data?.subjects?.map((course) => (
            <Stack
              key={course.id}
              sx={{
                backgroundColor: "#F5F5F4",
                borderRadius: "12px",
                padding: "8px",
              }}
            >
              <Typography variant="body2" component="div">
                {course.title}-{course.level}
              </Typography>
              <Typography variant="body2" color="GrayText" component="div">
                {course.description}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </div>
      {/* languages */}
      <div>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body1" component="div">
            Languages
          </Typography>
        </Stack>
        <Stack sx={{ display: "flex", flexFlow: "row wrap", gap: "8px" }}>
          {data?.languages?.map((language) => (
            <Stack
              key={language.id}
              sx={{
                backgroundColor: "#F5F5F4",
                borderRadius: "12px",
                padding: "4px",
              }}
            >
              <Typography variant="body2" component="div">
                {language.name}
              </Typography>
              <Typography variant="body2" color="GrayText" component="div">
                {language.level}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </div>
      {/*  */}
      <div>
        <Typography variant="body1" component="div">
          Contacts
        </Typography>
        <Typography variant="body2" color="GrayText" component="div">
          {data.email}
        </Typography>
      </div>
      <Divider />
      {/* comments */}
      <Stack spacing={1}>
        <Typography variant="body1" component="div">
          Comments from students
        </Typography>
        <Stack
          sx={{
            display: "flex",
            flexFlow: "row nowrap",
            width: matches ? "100%" : "650px",
            columnGap: "4px",
          }}
        >
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            size="small"
            label="add comment"
            sx={{ flex: 1, backgroundColor: "white" }}
            multiline
          />
          {text && (
            <Button
              disabled={loading}
              onClick={handleAddComment}
              sx={{
                backgroundColor: "white",
                borderRadius: "20px",
                width: "40px",
                minWidth: "40px",
                height: "40px",
                px: "0px",
                border: `2px solid ${stone400}`,
              }}
            >
              <SendIcon sx={{ fontSize: "16px", color: stone400 }} />
            </Button>
          )}
        </Stack>
        <Stack
          sx={{
            display: "flex",
            flexFlow: "row nowrap",
            gap: "8px",
            overflowX: "auto",
            maxWidth: "100vw",
          }}
        >
          {data?.tutorComments?.map((item) => (
            <CommentCard item={item} key={item.id} />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
