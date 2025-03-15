"use client";
import { useState } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import LoadingData from "@/components/loading-d";
import { Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import styles from "@/styles/datePicker.module.scss";
import { fetcher } from "@/helper";
import { AvailabilityType } from "@/lib/user-types";
import axios from "axios";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import EditAvailabilityModal from "@/components/editAvModal";
dayjs.extend(localizedFormat);

export default function Availability() {
  const matches = useMediaQuery("(max-width:500px)");
  const { data: session } = useSession();
  const [date, setDate] = useState<any | string>(null);

  const { data, error, isLoading, mutate } = useSWR<AvailabilityType[]>(
    `/api/av?userId=${session?.user.id}`,
    fetcher
  );
  const handleAddTime = async () => {
    await axios
      .post("/api/av", { time: date, userId: session?.user.id })
      .then(({ data }) => {
        mutate();
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "center",
          columnGap: "10px",
          marginBottom: "30px",
          marginTop: "20px",
        }}
      >
        <DatePicker
          selected={date}
          onChange={(value) => setDate(value)}
          showTimeSelect
          dateFormat="MM/dd/yyyy h:mm aa"
          placeholderText="Select time and date"
          showIcon
          className={styles["custom-datepicker"]}
          minDate={new Date()}
          minTime={dayjs().toDate()}
          maxTime={dayjs(new Date()).add(11, "hour").toDate()}
          icon={<CalendarMonthIcon sx={{ color: "grey",fontSize:"16px" }} />}
        />
        {date && (
          <Button
            size="small"
            sx={{
              color: "white",
              backgroundColor: "limegreen",
              textTransform: "lowercase",
              fontSize: "14px",
              "&:hover": {
                backgroundColor: "limegreen",
                opacity: "0.8",
              },
              py:0
            }}
            onClick={handleAddTime}
          >
            
            {matches?"add":"add to calender"}
          </Button>
        )}
      </div>
      {error && (
        <Typography variant="body2" component="div">
          failed to load data
        </Typography>
      )}
      <Stack sx={{ display: "flex", flexFlow: "row wrap", gap: "8px" }}>
        {isLoading ? (
          <LoadingData />
        ) : (
          data?.map((item) => (
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
                <Typography
                  variant="body2"
                  component="div"
                  sx={{
                    backgroundColor: "#FAFAF9",
                    width: "fit-content",
                    paddingX: "8px",
                    border: "2px solid #F3F4F6",
                    borderRadius: "12px",
                    fontStyle:item.booked?"italic":"",
                    color:item.booked?"gainsboro":"GrayText"
                  }}
                >
                 {item.booked?" booked":"not yet booked"}
                </Typography>
                <EditAvailabilityModal  currentTime={item.time} id={item.id} />
              </Stack>
            </Stack>
          ))
        )}
      </Stack>
    </div>
  );
}
