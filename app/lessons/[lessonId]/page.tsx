"use client";
import { useParams } from "next/navigation";
import useSWR from "swr";
import CircularProgress from "@mui/material/CircularProgress";
import { useSession } from "next-auth/react";
import styles from "@/styles/lesson.module.scss";
import { Button, Paper, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import localizedFormat from "dayjs/plugin/localizedFormat";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";
import axios from "axios";

dayjs.extend(calendar);
dayjs.extend(localizedFormat);

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Lesson = () => {
  const { data: session } = useSession();
  const param = useParams().lessonId;
  const [copied, setCopied] = useState<boolean>(false);
  const { data, error, mutate } = useSWR(`/api/lesson/${param}`, fetcher);
  const [loading, setLoading] = useState<boolean | any>(false);
  const createLink = async () => {
    setLoading(true);
    await axios.post("/api/zoom", {
      topic: `${data?.student?.firstName}${data?.course?.title}`,
      lessonId: data?.id,
      tutorId: data?.tutorId,
      studentId: data?.studentId,
      startAt: data?.startAt,
    });
    mutate();
    setLoading(false);
  };

  const deleteLink = async () => {
    setLoading(true);
    await axios.delete(`/api/zoom/${data?.zoom?.meetingId}`);
    mutate();
    setLoading(false);
  };
  if (error) <div>Failed to load</div>;
  if (!data)
    return (
      <div
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <CircularProgress size={20} />
      </div>
    );
  return (
    <div className={styles.container}>
      <Paper className={styles.header} elevation={0}>
        <div className={styles.headerdata}>
          <Typography variant="body1" component="div">
            {data?.course?.title}
          </Typography>
          <Typography variant="body2" component="div" color="GrayText">
            {dayjs().calendar(dayjs(data?.startAt))}
          </Typography>
        </div>
        <div className={styles.headerButtons}></div>
      </Paper>
      {(session?.user.Role === "student" || session?.user.Role === "admin") && (
        <Paper className={styles.tutor} elevation={0}>
          <Typography variant="body1" component="div">
            student
          </Typography>
          <Typography variant="body2" component="div" color="GrayText">
            {data?.student?.firstName}
          </Typography>
          <Typography variant="body2" component="div" color="GrayText">
            2 years studying here
          </Typography>
        </Paper>
      )}

      {(session?.user.Role === "tutor" || session?.user.Role === "admin") && (
        <Paper className={styles.tutor} elevation={0}>
          <Typography variant="body1" component="div">
            tutor
          </Typography>
          <Typography variant="body2" component="div" color="GrayText">
            {data?.tutor?.firstName}
          </Typography>
          <Typography variant="body2" component="div" color="GrayText">
            5 years of experience
          </Typography>
        </Paper>
      )}

      <Paper className={styles.zoom} elevation={0}>
        <Typography variant="body1" component="div">
          zoom link
        </Typography>
        {data?.zoom?.url && (
          <Stack direction="row" spacing={2}>
            <a href={data?.zoom?.url} style={{ color: "skyblue" }}>
              {data?.zoom?.url}
            </a>
            <ContentCopyIcon
              sx={{ fontSize: "18px" }}
              onClick={() =>
                navigator.clipboard.writeText(data?.zoom?.url).then(() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 3000);
                })
              }
            />
            {copied && (
              <Typography variant="body2" component="div">
                copied url
              </Typography>
            )}
          </Stack>
        )}
        <Stack sx={{ display: "flex", flexFlow: "row wrap", columnGap: "8px" }}>
          {!data?.zoom?.url ? (
            <Button
              variant="contained"
              size="small"
              onClick={createLink}
              sx={{
                textTransform: "lowercase",
                width: "100px",
                backgroundColor: "limegreen",
                fontSize: "16px",
                py: 0,
                boxShadow: 0,
              }}
            >
              {loading ? (
                <CircularProgress size={16} sx={{ color: "white" }} />
              ) : (
                "create link"
              )}
            </Button>
          ) : (
            <Button
              variant="contained"
              size="small"
              onClick={deleteLink}
              sx={{
                textTransform: "lowercase",
                width: "100px",
                backgroundColor: "tomato",
                fontSize: "16px",
                py: 0,
                boxShadow: 0,
              }}
            >
              {loading ? (
                <CircularProgress size={16} sx={{ color: "white" }} />
              ) : (
                "delete"
              )}
            </Button>
          )}
        </Stack>
      </Paper>
      <Paper className={styles.contact} elevation={0}>
        <Typography variant="body1" component="div">
          {session?.user.Role === "student"
            ? "sudent contants"
            : session?.user.Role === "tutor"
            ? "tutor contacts"
            : " contacts "}
        </Typography>
        <Typography variant="body2" component="div" color="GrayText">
          {session?.user.Role === "student"
            ? data?.student?.email
            : session?.user.Role === "tutor"
            ? data?.tutor?.email
            : "student email -" +
              data?.student?.email +
              "," +
              "tutor email - " +
              data?.tutor?.email}
        </Typography>
      </Paper>
    </div>
  );
};

export default Lesson;
