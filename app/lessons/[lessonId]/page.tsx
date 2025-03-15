"use client";
import { useParams } from "next/navigation";
import useSWR from "swr";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";

import styles from "@/styles/lesson.module.scss";
import { Button, Chip, colors, Paper, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import localizedFormat from "dayjs/plugin/localizedFormat";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";

dayjs.extend(calendar);
dayjs.extend(localizedFormat);

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Lesson = () => {
  const param = useParams().lessonId;
  const router = useRouter();
  const [copied, setCopied] = useState<boolean>(false);
  const { data, error } = useSWR(`/api/lesson/${param}`, fetcher);
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
      <Paper className={styles.header} elevation={1}>
        <div className={styles.headerdata}>
          <Typography variant="body1" component="div">
            {data?.course?.title}
          </Typography>
          <Typography variant="body2" component="div" color="GrayText">
            {dayjs().calendar(dayjs(data?.startAt))}
          </Typography>
        </div>
        <div className={styles.headerButtons}>
          <Button
            variant="contained"
            size="small"
            sx={{
              textTransform: "lowercase",
              width: "100px",
              backgroundColor: "limegreen",
              fontSize: "16px",
              py:0
            }}
          >
            cancel
          </Button>
        </div>
      </Paper>
      <Paper className={styles.tutor}>
        <Typography variant="body1" component="div">
          tutor
        </Typography>
        <Typography variant="body2" component="div" color="GrayText">
          Misha Jose
        </Typography>
        <Typography variant="body2" component="div" color="GrayText">
          5 years of experience
        </Typography>
      </Paper>
      <Paper className={styles.zoom}>
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
      </Paper>
      <Paper className={styles.contact}>
        <Typography variant="body1" component="div">
          contact us
        </Typography>
        <Typography variant="body2" component="div" color="GrayText">
          email
        </Typography>
        <Typography variant="body2" component="div" color="GrayText">
          whatsapp
        </Typography>
        <Typography variant="body2" component="div" color="GrayText">
          telegram
        </Typography>
      </Paper>
    </div>
  );
};

export default Lesson;
