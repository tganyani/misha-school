"use client";
import useSWR from "swr";
import CircularProgress from "@mui/material/CircularProgress";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Paper from "@mui/material/Paper";
import styles from "@/styles/lessons.module.scss";
import { Divider, Typography } from "@mui/material";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import calendar from "dayjs/plugin/calendar";
import Badge from "@mui/material/Badge";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
dayjs.extend(calendar);
dayjs.extend(localizedFormat);

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Lessons = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { data, error } = useSWR(
    `/api/lesson/get/${session?.user.id}`,
    fetcher
  );
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
      {data.map((lesson: any, i: number) => (
        <Badge badgeContent={i + 1} color="success" key={lesson.id}>
          <Paper
            className={styles.lesson}
            sx={{ flexFlow: i % 2 === 0 ? "row nowrap" : "row-reverse nowrap" }}
            onClick={() => router.push(`/lessons/${lesson.id}`)}
          >
            <div className={styles.styleDiv}></div>
            <div className={styles.dataDiv}>
              <Typography variant="body1" component="div">
                {lesson?.course?.title}
              </Typography>
              <Divider />
              <Typography variant="body2" component="div" color="GrayText">
                {
                  //   dayjs(lesson?.startAt).format("LT")
                  dayjs().calendar(dayjs(lesson?.startAt))
                }
              </Typography>
              <Typography variant="body2" component="div" color="GrayText">
                duration- <span style={{ color: "black" }}>1</span> hour
              </Typography>
              <ArrowRightAltIcon sx={{ fontSize: "30px" }} />
            </div>
          </Paper>
        </Badge>
      ))}
    </div>
  );
};

export default Lessons;
