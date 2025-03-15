"use client";
import { useParams } from "next/navigation";
import useSWR from "swr";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";

import styles from "@/styles/lesson.module.scss";
import { Button, Chip, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(calendar);
dayjs.extend(localizedFormat);

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Lesson = () => {
  const param = useParams().lessonId;
  const router = useRouter()
  const { data, error } = useSWR(`/api/lesson/getlesson/${param}`, fetcher);
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
          zoom links
        </Typography>
        <Typography variant="body2" component="div" color="GrayText">
          copy
        </Typography>
        <Typography variant="body2" component="div" color="GrayText">
          share
        </Typography>
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
