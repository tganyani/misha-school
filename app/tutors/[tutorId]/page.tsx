"use client";
import { useParams } from "next/navigation";
import { Stack, Typography, Button } from "@mui/material";
import useSWR from "swr";
import { userProfileType } from "@/lib/user-types";
import LoadingData from "@/components/loading-d";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

import { fetcher } from "@/helper";
import BookModal from "@/components/bookModal";

export default function Profile() {
  const { tutorId } = useParams();
  const { data, error, isLoading } = useSWR<userProfileType>(
    `/api/user/${tutorId}`,
    fetcher
  );
  if (isLoading) return <LoadingData />;
  if (error) return <div>failed to load data</div>;
  if (!data) return null;
  return (
    <Stack
      sx={{ display: "flex", flexDirection: "column", rowGap: "20px", px: 1 }}
    >
      <div>
        <div>
          <Typography variant="body1" component="div">
            {data?.firstName} ,{data?.lastName}
          </Typography>
          <Typography color="GrayText" variant="body2" component="div">
            {" "}
            {data?.country},{data?.hLeducation},{data?.Role}
          </Typography>
        </div>
      </div>
      {/* Bookable Time */}
      <div>
        <Typography variant="body1" component="div">
          Bookable time
        </Typography>
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
                <BookModal
                  courses={data.subjects}
                  tutorId={data.id}
                  tutorEmail={data.email}
                  tutorName={data.firstName + " " + data.lastName}
                  startAt={item.time}
                  id={item.id}
                  booked={item.booked}
                />
              </Stack>
            </Stack>
          ))}
        </Stack>
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
    </Stack>
  );
}
