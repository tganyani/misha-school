"use client";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { userProfileType } from "@/lib/user-types";
import { fetcher } from "@/helper";
import LoadingData from "@/components/loading-d";
import TutorCard from "@/components/tutorCard";
import { useEffect, useState } from "react";

export default function Tutors() {
  const { data: session } = useSession();
  const [seachTerms, setSearchTerms] = useState<{
    subject: string;
    level: string;
  }>({ subject: "", level: "" });
  const { data, error, isLoading, mutate } = useSWR<userProfileType[]>(
    `/api/tutor?subject=${seachTerms.subject}&level=${seachTerms.level}`,
    fetcher,
    {
      keepPreviousData:true
    }
  );
  useEffect(() => {
    mutate();
  }, [seachTerms]);
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
          onChange={(e) =>
            setSearchTerms({ ...seachTerms, subject: e.target.value })
          }
          label="subject"
          size="small"
          value={seachTerms.subject}
          sx={{
            minWidth: "50px",
            "& .MuiOutlinedInput-root > fieldset": {
              borderRadius: "20px 0 0 20px", // inline border radius
            },
          }}
        />

        <FormControl
          size="small"
          sx={{
            minWidth: "200px",
            "& .MuiOutlinedInput-root > fieldset": {
              borderRadius: "0 20px 20px 0", // inline border radius
            },
          }}
        >
          <InputLabel>choose course</InputLabel>

          <Select
            value={seachTerms.level}
            label="choose course"
            onChange={(e) =>
              setSearchTerms({ ...seachTerms, level: e.target.value })
            }
          >
            <MenuItem value="primary">Primary</MenuItem>
            <MenuItem value="secondary">Secondary</MenuItem>
            <MenuItem value="university">University</MenuItem>
          </Select>
        </FormControl>
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
          data.map((user) => <TutorCard user={user} key={user.id} />)
        )}
      </div>
    </Stack>
  );
}
