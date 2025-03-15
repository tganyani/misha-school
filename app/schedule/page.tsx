"use client";
import useSWR from "swr";
import CircularProgress from "@mui/material/CircularProgress";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc"; // Ensure UTC format
dayjs.extend(utc);
dayjs.extend(localizedFormat);

import "@schedule-x/theme-default/dist/index.css";
import styles from "@/styles/schedule.module.scss";
import { useEffect, useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Schedule = () => {
  const router = useRouter()
  const { data: session } = useSession();
  //   schedulax

  const eventsService = useState(() => createEventsServicePlugin())[0];
  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: [],
    plugins: [eventsService],
    callbacks: {
      onEventClick(calendarEvent) {
        router.push(`/lessons/${calendarEvent.id}`)
      },
    },
  });
  const { data, error } = useSWR(
    `/api/lesson/get/${session?.user?.id}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      const ev = data?.map((event: any) => ({
        id: event.id,
        title: event.course.title,
        start: dayjs(event.startAt).format("YYYY-MM-DD HH:mm"),
        end: dayjs(event.startAt).add(1, "h").format("YYYY-MM-DD HH:mm"),
      }));
      console.log(ev)
      return eventsService.set(ev);
    }
  }, [data]);
  
  useEffect(() => {
    // get all events
    eventsService.getAll();
  }, []);
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
      <div>
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
    </div>
  );
};

export default Schedule;
