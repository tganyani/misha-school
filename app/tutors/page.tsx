"use client";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import useMediaQuery from "@mui/material/useMediaQuery";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { Chip, Stack, TextField, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleIcon from "@mui/icons-material/People";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { userProfileType } from "@/lib/user-types";
import { fetcher } from "@/helper";
import LoadingData from "@/components/loading-d";
import FreeBookModal from "@/components/freeBookModal";
import { stone100, stone200, stone400 } from "@/lib/constants";

export default function Tutors() {
  const router = useRouter();
  const matches = useMediaQuery("(max-width:500px)");
  const { data: session } = useSession();
  const [value, setValue] = useState<number | null>(2);

  const { data, error, isLoading } = useSWR<userProfileType[]>(
    `/api/tutor`,
    fetcher
  );
  if (!data) return null;
  return (
    <Stack sx={{ display: "flex", flexFlow: "column nowrap", gap: 2, mt: 2 }}>
      <Stack
        sx={{
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "center",
          width: "100%",
          overflowX: "auto",
          py: 2,
        }}
      >
        <TextField
          label="subject"
          size="small"
          sx={{
            minWidth: "50px",
            "& .MuiOutlinedInput-root > fieldset": {
              borderRadius: "20px 0 0 20px", // inline border radius
            },
          }}
        />
        <TextField
          label="school level "
          size="small"
          sx={{ minWidth: "50px" }}
        />
        <TextField
          label="availabity "
          size="small"
          sx={{
            minWidth: "50px",
            "& .MuiOutlinedInput-root > fieldset": {
              borderRadius: "0 20px 20px 0", // inline border radius
            },
          }}
        />
      </Stack>
      {error && (
        <Typography component="div" variant="body2">
          failed to fetch data
        </Typography>
      )}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "space-around",
          padding: "8px",
        }}
      >
        {isLoading ? (
          <LoadingData />
        ) : (
          data.map((user) => (
            <div
              key={user.id}
              style={{
                display: "flex",
                border: `2px solid ${stone100}`,
                padding: "16px",
                borderRadius: "16px",
                width: matches ? "100%" : "360px",
                flexDirection: "column",
                height: "380px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "8px",
                  flex: 1,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexFlow: "row nowrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "14px",
                  }}
                >
                  <img
                    src="https://asset20.ckassets.com/thegoodlookbook/wp-content/uploads/sites/2/2019/03/10-3.jpg"
                    alt="user-profile"
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "30px",
                    }}
                  />
                  <Typography component="div" variant="body1">
                    {user.firstName} {user.lastName}
                  </Typography>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      flexWrap: "nowrap",
                      width: "160px",
                      border: `2px solid ${stone200}`,
                      padding: "2px",
                      borderRadius: "16px",
                    }}
                  >
                    <CalendarMonthIcon
                      style={{ fontSize: "14px", color: stone400 }}
                    />
                    <Typography
                      component="div"
                      variant="body2"
                      color="GrayText"
                    >
                      Available
                    </Typography>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexFlow: "row nowrap",
                    rowGap: "8px",
                    alignItems: "center",
                    gap: "14px",
                  }}
                >
                  <PeopleIcon style={{ fontSize: "14px", color: "grey" }} />
                  <Typography component="div" variant="body2">
                    1203 lessons- helped 233 students
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexFlow: "row nowrap",
                    rowGap: "8px",
                    alignItems: "center",
                    gap: "14px",
                  }}
                >
                  <EmojiEventsIcon
                    style={{ fontSize: "14px", color: "grey" }}
                  />
                  <Typography component="div" variant="body2">
                    3+years teaching at MishaStudent
                  </Typography>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <Chip size="small" label="maths" />
                  <Chip size="small" label="english" />
                  <Chip size="small" label="physics" />
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography component="div" variant="body2">
                    $20 - $30 / lesson
                  </Typography>
                  <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </div>
                <div style={{flex:1}}>
                  <Typography
                  color="GrayText"
                  component="div"
                  variant="body2"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 3, // number of lines before ellipsis
                    WebkitBoxOrient: "vertical",
                    whiteSpace: "normal", // allow wrapping
                  }}
                >
                  {user.about} 
                </Typography>
                </div>
                <Button
                  size="small"
                  onClick={() => router.push(`/tutors/${user.id}`)}
                  sx={{ textTransform: "lowercase" }}
                >
                  read more
                </Button>
                <FreeBookModal
                  courses={user.subjects}
                  tutorName={user.firstName + " " + user.lastName}
                  tutorEmail={user.email}
                  tutorId={user.id}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </Stack>
  );
}
