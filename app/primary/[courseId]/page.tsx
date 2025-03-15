"use client";
import * as React from "react";
import { useParams } from "next/navigation";
import { Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import styles from "@/styles/course.module.scss";

import Chip from "@mui/material/Chip";
import Carousel from "react-material-ui-carousel";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddIcon from "@mui/icons-material/Add";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import Dialog from "@mui/material/Dialog";
import { feedbacks } from "@/db";
import { feedback } from "@/db";

import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
// ***************************
import { stringToColor } from "@/helper";
import { groupIntoChunks } from "@/helper";
//************************* */
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
//*************************** */
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);
//************************ */

import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
//***************************** */
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
//**************************** */
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

function getWindowSize() {
  if (typeof window !== "undefined") {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }
}
import useSWR from "swr";
import CircularProgress from "@mui/material/CircularProgress";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//********************* */
type dt = {
  id: string;
  item: string | any;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface course {
  id: number;
  title: string;
  description: string;
  image: string;
  tutor: string;
  rating: number;
  level: string;
}

const PrimaryCourse = () => {
  const param = useParams().courseId;
  const [windowSize, setWindowSize] = useState<any>(getWindowSize());
  const [idReadMore, setIdReadMore] = useState<number>(-1);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<any | string>(null);
  const [dates, setDates] = useState<dt[]>([]);

  // session data
  const { data: session } = useSession();

  //******************************* */
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  // Determine the chunk size based on device
  const chunkSize = isTablet
    ? isMobile
      ? 1
      : Math.floor(windowSize?.innerWidth / 220)
    : Math.floor(windowSize?.innerWidth / 220);
  //************************* */
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  useEffect(()=>{
    localStorage.setItem("dates",JSON.stringify(dates))
  },[dates])
  //************************* */
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //*********************** */
  const handleAddDate = () => {
    setDates([...dates, { id: uuidv4(), item: date.toString() }]);
    setDate(null);
  };
  const handleDeleteDate = (id: string) => {
    setDates(dates.filter((d: dt) => d.id !== id));
  };

  const createOrder = async () => {
    const res = await axios
      .post("/api/paypal/create")
      .then((res) => res.data.id)
      .catch((err) => console.error(err));
    // console.log("res",res)
    return res;
  };
  const approveOrder = async (data: any, actions: any) => {
    // console.log("data",data)
    const res = await axios
      .post(
        "/api/paypal/approve",
        { orderId: data.orderID },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => res.data)
      .catch((err) => console.error(err));
      console.log(res)
    if (res?.status === "COMPLETED") {
      console.log("yes")
      const lessons = JSON.parse(localStorage.getItem("dates") as string).map((date:any) => ({
        startAt: date.item,
        studentId: session?.user.id,
        courseId: param,
      }));
      await axios
        .post("/api/lesson/create", lessons, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data)
        .catch((err) => console.error(err));
    }
  };

  const { data, error } = useSWR(`/api/course/get/${param}`, fetcher);
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
      {
        <div className={styles.course}>
          <div className={styles.hearder}>
            <Typography variant="body1" component="div">
              {data?.title}
            </Typography>
            <Chip
              onClick={handleClickOpen}
              sx={{
                backgroundColor: "limegreen",
                color: "white",
                minWidth: "100px",
              }}
              label="get enrolled now"
            />
          </div>
          <div className={styles.description}>
            <Typography variant="body1" component="div">
              course description
            </Typography>
            <Typography variant="body2" component="div" color="GrayText">
              {data?.description}
            </Typography>
          </div>
          <div className={styles.tutor}>
            <Typography variant="body1" component="div">
              tutor
            </Typography>
            <Typography variant="body2" component="div" color="GrayText">
              Misha Jose - 2 years of experience
            </Typography>
          </div>
          <div className={styles.fdback}>
            <div
              style={{
                display: "flex",
                flexFlow: "row nowrap",
                justifyContent: "space-between",
                marginRight: "30px",
              }}
            >
              <Typography variant="body1" component="div">
                <FormatQuoteIcon
                  sx={{ color: "limegreen", fontSize: "25px" }}
                />
                feedback from some of our students
              </Typography>
              <AddIcon
                sx={{ color: "limegreen", fontSize: "25px" }}
                onClick={() => alert("add feedback")}
              />
            </div>
            <Carousel sx={{ width: "100vw", overflowY: "visible" }}>
              {groupIntoChunks(feedbacks, chunkSize).map(
                (fdGroup: feedback[], groupIndex: number) => (
                  <div
                    key={groupIndex}
                    style={{
                      display: "flex",
                      flexFlow: "row nowrap",
                      justifyContent: "space-around",
                    }}
                  >
                    {fdGroup?.map((fd: feedback) => (
                      <Paper
                        className={
                          idReadMore === fd.id
                            ? styles.paperReadMore
                            : styles.paper
                        }
                        sx={{
                          backgroundColor: "#F5F5F5",
                          width: "210px",
                          padding: "5px",
                        }}
                        key={fd.id}
                      >
                        <Stack
                          direction="row"
                          spacing={2}
                          sx={{ alignItems: "center" }}
                        >
                          <Avatar sx={{ bgcolor: stringToColor(fd.name) }}>
                            {fd.name.split("")[0]}
                          </Avatar>
                          <Typography variant="body2" component="div">
                            {fd.name}
                          </Typography>
                        </Stack>
                        <Typography
                          variant="body2"
                          component="div"
                          color="GrayText"
                          className={styles.msg}
                        >
                          {fd.message}
                        </Typography>
                        {idReadMore === fd.id ? (
                          <Button
                            sx={{ textTransform: "lowercase" }}
                            onClick={() => setIdReadMore(-1)}
                          >
                            <KeyboardArrowUpIcon
                              sx={{ color: "limegreen", fontSize: "25px" }}
                            />
                          </Button>
                        ) : (
                          <Button
                            sx={{ textTransform: "lowercase" }}
                            onClick={() => setIdReadMore(fd.id)}
                          >
                            <KeyboardArrowDownIcon
                              sx={{ color: "limegreen", fontSize: "25px" }}
                            />
                          </Button>
                        )}
                      </Paper>
                    ))}
                  </div>
                )
              )}
            </Carousel>
          </div>
          <div className={styles.enrol}>
            <Chip
              onClick={handleClickOpen}
              sx={{
                backgroundColor: "limegreen",
                color: "white",
                minWidth: "100px",
              }}
              label="get enrolled now"
            />
          </div>
          <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
          >
            <div
              style={{
                backgroundImage: `url("/home-background.jpg")`,
                height: "70px",
                backgroundColor: "limegreen",
                display: "flex",
                flexFlow: "row nowrap",
                justifyContent: "space-between",
                backgroundRepeat: "no-repeat",
                backgroundBlendMode: "color",
                padding: "10px",
                backgroundSize: "cover",
              }}
            >
              <Typography variant="body1" component="div">
                {data?.title}
              </Typography>
              <CloseIcon onClick={handleClose} />
            </div>
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
                />
                {date && (
                  <Button
                    size="small"
                    sx={{
                      color: "white",
                      backgroundColor: "limegreen",
                      textTransform: "lowercase",
                      "&:hover": {
                        backgroundColor: "limegreen",
                        opacity: "0.8",
                      },
                    }}
                    onClick={handleAddDate}
                  >
                    add to calender
                  </Button>
                )}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexFlow: "row wrap",
                justifyContent: "space-around",
                columnGap: "15px",
                rowGap: "15px",
                marginBottom: "20px",
                minHeight: "100px",
                overflowY: "auto",
              }}
            >
              {dates.map((d: dt, i: number) => (
                <Chip
                  key={d.id}
                  sx={{ height: "auto" }}
                  onDelete={() => handleDeleteDate(d.id)}
                  label={
                    <div style={{ whiteSpace: "normal" }}>
                      <Typography variant="body1" component="div">
                        lesson-{i + 1}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="GrayText"
                        component="div"
                      >
                        date -{dayjs(d.item).format("ll")}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="GrayText"
                        component="div"
                      >
                        starts at -{dayjs(d.item).format("LT")}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="GrayText"
                        component="div"
                      >
                        finishes at -{dayjs(d.item).add(1, "h").format("LT")}
                      </Typography>
                    </div>
                  }
                />
              ))}
            </div>
            <Divider />
            <div style={{ width: "150px", marginTop: "20px", padding: "10px" }}>
              <Typography variant="body1" component="div">
                check out
              </Typography>
              <Typography variant="body2" color="GrayText" component="div">
                {dates.length} lessons * $30
              </Typography>
              <Typography variant="body2" component="div">
                total ${dates.length * 30}
              </Typography>
              <Divider />
            </div>
            <div>
              <PayPalScriptProvider
                options={{
                  clientId:
                    "AZKbRgOAc5zD92AsYljcuy73BVaNtER4_X58l5HiqzOkNojaUKi6tocMlsG7trlkizg4i0BMw8aNxtF4",
                  currency: "USD",
                  intent: "capture",
                }}
              >
                <PayPalButtons
                  createOrder={createOrder}
                  onApprove={approveOrder}
                  style={{ layout: "vertical" }}
                />
              </PayPalScriptProvider>
            </div>
          </Dialog>
        </div>
      }
    </div>
  );
};

export default PrimaryCourse;
