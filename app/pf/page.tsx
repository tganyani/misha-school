"use client";
import { useSession } from "next-auth/react";
import { Stack, Typography } from "@mui/material";
import useSWR from "swr";
import {  userProfileType } from "@/lib/user-types";
import LoadingData from "@/components/loading-d";

import { fetcher } from "@/helper";
import EditNameModal from "@/components/editNameModal";
import EditAboutModal from "@/components/editAboutModal";
import EditCourseModal from "@/components/editCourseModal";
import EditLanguageModal from "@/components/editLanguageModal";

export default function Profile() {
  const { data: session } = useSession();
  const { data, error, isLoading } = useSWR<userProfileType>(
    `/api/user/${session?.user.id}`,
    fetcher
  );
  if (isLoading) return <LoadingData />;
  if (error) return <div>failed to load data</div>;
  if (!data) return null;
  return (
    <Stack sx={{ display: "flex", flexDirection: "column", rowGap: "20px",px:1 }}>
      <div>
        <div>
          <Typography variant="body1" component="div">
            {data?.firstName} ,{data?.lastName}
          </Typography>
          <Typography color="GrayText" variant="body2" component="div">
            {" "}
            {data?.country},{data?.hLeducation},{data?.Role}
          </Typography>
          <EditNameModal
            firstName={data?.firstName}
            lastName={data?.lastName}
            hLeducation={data?.hLeducation}
            country={data?.country}
          />
        </div>
      </div>
      {/* About */}
      <div>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body1" component="div">
            About
          </Typography>
          <EditAboutModal about={data?.about} />
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
          <EditCourseModal
            editMode={false}
            title=""
            description=""
            level=""
            id={undefined}
          />
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
              <EditCourseModal
                editMode={true}
                title={course.title}
                description={course.description}
                level={course.level}
                id={course.id}
              />
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
          <EditLanguageModal languages={data?.languages} />
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
          {session?.user.email}
        </Typography>
      </div>
    </Stack>
  );
}
