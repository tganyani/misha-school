"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditButton from "./editButton";
import CircularProgress from "@mui/material/CircularProgress";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import axios from "axios";
import { mutate } from "swr";
import { Stack } from "@mui/material";
import dayjs from "dayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import styles from "@/styles/datePicker.module.scss";
import CloseIcon from "@mui/icons-material/Close";

export default function EditAvailabilityModal({
  currentTime,
  id,
}: {
  currentTime: string;
  id: string;
}) {
  const matches = useMediaQuery("(max-width:500px)");
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingD, setLoadingD] = useState<boolean>(false);
  const [date, setDate] = useState<any | string>(new Date(currentTime));

  const handleUpdate = async () => {
    setLoading(true);
    await axios
      .patch(`/api/av/${id}`, { time: date })
      .then(({ data }) => {
        if (data?.id) {
          setOpen(false);
        }
      })
      .catch((err) => console.error(err));
    mutate(`/api/av?userId=${session?.user.id}`);
    setLoading(false);
  };
  const handleDelete = async () => {
    setLoadingD(true);
    await axios
      .delete(`/api/av/${id}`)
      .then(({ data }) => {
        if (data?.id) {
          setOpen(false);
        }
      })
      .catch((err) => console.error(err));
    mutate(`/api/av?userId=${session?.user.id}`);
    setLoadingD(false);
  };

  return (
    <>
      <EditButton open={open} setOpen={setOpen} />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        fullScreen={matches}
      >
        <Stack
          sx={{
            display: "flex",
            flexFlow: "row nowrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <DialogTitle fontSize="small">Update</DialogTitle>
          <CloseIcon
            onClick={()=>setOpen(false)}
            sx={{
              color: "GrayText",
              fontSize: "18px",
              "&:hover": {
                fontSize: "20px",
              },
            }}
          />
        </Stack>
        <DialogContent
          sx={{
            paddingBottom: 0,
            height: "100vh",
            overflowY: "auto",
            px: 1,
          }}
        >
          <Stack spacing={2}>
            <div
              style={{
                display: "flex",
                flexFlow: matches ? "column nowrap" : "row nowrap",
                justifyContent: "center",
                columnGap: "10px",
                marginBottom: "30px",
                marginTop: "20px",
                rowGap: "8px",
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
                icon={
                  <CalendarMonthIcon sx={{ color: "grey", fontSize: "16px" }} />
                }
              />
              <Stack
                sx={{
                  display: "flex",
                  flexFlow: "row nowrap",
                  justifyContent: "space-between",
                  flex: 1,
                }}
              >
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
                      py: 0,
                    }}
                    onClick={handleUpdate}
                  >
                    {loading ? (
                      <CircularProgress size={16} sx={{ color: "white" }} />
                    ) : (
                      "update"
                    )}
                  </Button>
                )}
                <Button
                  size="small"
                  sx={{
                    color: "white",
                    backgroundColor: "tomato",
                    textTransform: "lowercase",
                    fontSize: "14px",
                    "&:hover": {
                      backgroundColor: "red",
                      opacity: "0.8",
                    },
                    py: 0,
                  }}
                  onClick={handleDelete}
                >
                  {loadingD ? (
                    <CircularProgress size={16} sx={{ color: "white" }} />
                  ) : (
                    "delete"
                  )}
                </Button>
              </Stack>
            </div>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
