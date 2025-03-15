"use client";
import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { Button, Divider, Stack, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Alert, Drawer, Paper } from "@mui/material";
import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import LoadingData from "@/components/loading-d";

import { fetcher } from "@/helper";

type PlanType = {
  value: number;
  title: string;
  nLesson: number;
};
const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string;

export default function PaymentPlan() {
  const router = useRouter();
  const { data: session } = useSession();
  const [plan, setPlan] = useState<PlanType>({
    title: "",
    value: 0,
    nLesson: 0,
  });
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [successPayment, setSuccessPayment] = useState<boolean>(false);
  const scrollCheckout = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    scrollCheckout.current?.scrollIntoView({
      block: "end",
      behavior: "smooth",
    });
  }, [plan]);

  const toggleDrawer = (open: boolean): void => {
    setOpenDrawer(open);
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
    console.log(res);
    if (res?.status === "COMPLETED") {
      setSuccessPayment(true);
      await axios
        .post("/api/plan", {
          userId: session?.user.id,
          type: plan.title,
          nLesson: plan.nLesson,
        })
        .then((res) => res.data)
        .catch((err) => console.error(err));
      setTimeout(() => {
        setSuccessPayment(false);
      }, 4000);
    }
    toggleDrawer(false);
  };

  const { data, isLoading, mutate } = useSWR<{
    type: string;
    nLessonsLeft: number;
  }>(session?.user?.id ? `/api/plan?userId=${session.user.id}` : null, fetcher);

  return (
    <Stack sx={{ px: 1 }}>
      {session && (
        <Stack sx={{height:"50px",py:4}}>
          {isLoading ? (
            <LoadingData />
          ) : (
            <Stack>
              <Typography
                component="div"
                sx={{ textAlign: "center", color: "#757575" }}
              >
                You are currently using a {data?.type} plan
              </Typography>
              <Typography
                component="div"
                variant="body2"
                color="GrayText"
                sx={{ textAlign: "center", color: "#757575" }}
              >
                You are left with{" "}
                <span style={{ fontWeight: "bold" }}>{data?.nLessonsLeft}</span>{" "}
                lessons
              </Typography>
            </Stack>
          )}
        </Stack>
      )}
      <Stack sx={{ py: 4 }}>
        <Stack
          sx={{
            display: "flex",
            flexFlow: "row wrap",
            gap: "16px",
            justifyContent: "space-around",
          }}
        >
          {/* Starter Plan */}
          <Stack
            sx={{
              width: "300px",
              boxShadow: "0 1px 2px 0 #e7e5e4",
              border: "1px solid #e7e5e4",
              borderRadius: "20px",
              display: "flex",
              height: "400px",
            }}
          >
            <Stack
              component="div"
              sx={{
                backgroundColor: "#757575",
                height: "30px",
                borderRadius: "20px 20px 0 0",
              }}
            ></Stack>
            <Typography component="div" sx={{ textAlign: "center" }}>
              Starter Plan
            </Typography>
            <Typography
              component="div"
              sx={{ textAlign: "center", color: "#757575" }}
            >
              $40
            </Typography>
            <Typography
              component="div"
              variant="body1"
              color="GrayText"
              sx={{ textAlign: "center" }}
            >
              4 lessons
            </Typography>
            <Divider />
            <List component="ul" sx={{ listStyleType: "disc", pl: 4, flex: 1 }}>
              <ListItem
                disablePadding
                component="li"
                sx={{ display: "list-item" }}
              >
                <ListItemText secondary="Access to revision notes and basic practice materials" />
              </ListItem>
              <ListItem
                disablePadding
                component="li"
                sx={{ display: "list-item" }}
              >
                <ListItemText secondary="Lesson recordings for review " />
              </ListItem>
              <ListItem
                disablePadding
                component="li"
                sx={{ display: "list-item" }}
              >
                <ListItemText secondary="Messaging support for quick questions (limited hours)" />
              </ListItem>
              <ListItem
                disablePadding
                component="li"
                sx={{ display: "list-item" }}
              >
                <ListItemText secondary="expires within a week" />
              </ListItem>
            </List>
            <Button
              variant="contained"
              onClick={() => {
                setPlan({ title: "Starter", value: 40, nLesson: 4 });
              }}
              disabled={plan.title === "Starter"}
              sx={{
                color: "white",
                backgroundColor: "#757575",
                textTransform: "lowercase",
                borderRadius: "20px",
                boxShadow: 0,
                "&:hover": {
                  backgroundColor: "#212121",
                },
              }}
            >
              {plan.title === "Starter" && (
                <CheckIcon sx={{ fontSize: "16px", color: "white" }} />
              )}

              {plan.title === "Starter" ? "chosen" : "choose plan"}
            </Button>
          </Stack>
          {/* Standard Plan */}
          <Stack
            sx={{
              width: "300px",
              boxShadow: "0 1px 2px 0 #e7e5e4",
              border: "1px solid #e7e5e4",
              borderRadius: "20px",
              display: "flex",
              height: "400px",
            }}
          >
            <Stack
              component="div"
              sx={{
                backgroundColor: "limegreen",
                height: "30px",
                borderRadius: "20px 20px 0 0",
              }}
            ></Stack>
            <Typography component="div" sx={{ textAlign: "center" }}>
              Standard Plan
            </Typography>
            <Typography
              component="div"
              sx={{ textAlign: "center", color: "limegreen" }}
            >
              $70
            </Typography>
            <Typography
              component="div"
              variant="body1"
              color="GrayText"
              sx={{ textAlign: "center" }}
            >
              6 lessons
            </Typography>
            <Divider />
            <List component="ul" sx={{ listStyleType: "disc", pl: 4, flex: 1 }}>
              <ListItem
                disablePadding
                component="li"
                sx={{ display: "list-item" }}
              >
                <ListItemText secondary="Priority scheduling for sessions" />
              </ListItem>
              <ListItem
                disablePadding
                component="li"
                sx={{ display: "list-item" }}
              >
                <ListItemText secondary="Homework help and assignment feedback " />
              </ListItem>
              <ListItem
                disablePadding
                component="li"
                sx={{ display: "list-item" }}
              >
                <ListItemText secondary="Weekly progress report for the student/parent" />
              </ListItem>
              <ListItem
                disablePadding
                component="li"
                sx={{ display: "list-item" }}
              >
                <ListItemText secondary="Practice tests & exam prep materials" />
              </ListItem>
              <ListItem
                disablePadding
                component="li"
                sx={{ display: "list-item" }}
              >
                <ListItemText secondary="expires within  2 weeks" />
              </ListItem>
            </List>
            <Button
              variant="contained"
              disabled={plan.title === "Standard"}
              onClick={() => {
                setPlan({ title: "Standard", value: 70, nLesson: 6 });
              }}
              sx={{
                color: "white",
                backgroundColor: "limegreen",
                textTransform: "lowercase",
                borderRadius: "20px",
                boxShadow: 0,
                "&:hover": {
                  backgroundColor: "lawngreen",
                },
              }}
            >
              {plan.title === "Standard" && (
                <CheckIcon sx={{ fontSize: "16px", color: "white" }} />
              )}

              {plan.title === "Standard" ? "chosen" : "choose plan"}
            </Button>
          </Stack>
          {/* Premium Plan*/}
          <Stack
            sx={{
              width: "300px",
              boxShadow: "0 1px 2px 0 #e7e5e4",
              border: "1px solid #e7e5e4",
              borderRadius: "20px",
              display: "flex",
              height: "400px",
            }}
          >
            <Stack
              component="div"
              sx={{
                backgroundColor: "#039be5",
                height: "30px",
                borderRadius: "20px 20px 0 0",
              }}
            ></Stack>
            <Typography component="div" sx={{ textAlign: "center" }}>
              Premium Plan
            </Typography>
            <Typography
              component="div"
              sx={{ textAlign: "center", color: "#039be5" }}
            >
              $150
            </Typography>
            <Typography
              component="div"
              variant="body1"
              color="GrayText"
              sx={{ textAlign: "center" }}
            >
              12 lessons
            </Typography>
            <Divider />
            <List component="ul" sx={{ listStyleType: "disc", pl: 4, flex: 1 }}>
              <ListItem
                disablePadding
                component="li"
                sx={{ display: "list-item" }}
              >
                <ListItemText secondary="Unlimited Q&A through messaging platform" />
              </ListItem>
              <ListItem
                disablePadding
                component="li"
                sx={{ display: "list-item" }}
              >
                <ListItemText secondary="Personalized learning plan based on student’s needs " />
              </ListItem>
              <ListItem
                disablePadding
                component="li"
                sx={{ display: "list-item" }}
              >
                <ListItemText secondary="Regular mock tests with feedback" />
              </ListItem>
              <ListItem
                disablePadding
                component="li"
                sx={{ display: "list-item" }}
              >
                <ListItemText secondary="Parent-teacher check-in calls" />
              </ListItem>
              <ListItem
                disablePadding
                component="li"
                sx={{ display: "list-item" }}
              >
                <ListItemText secondary="Access to all recorded lessons and premium resources" />
              </ListItem>
              <ListItem
                disablePadding
                component="li"
                sx={{ display: "list-item" }}
              >
                <ListItemText secondary="expires within a month" />
              </ListItem>
            </List>
            <Button
              variant="contained"
              disabled={plan.title === "Premium"}
              onClick={() => {
                setPlan({ title: "Premium", value: 150, nLesson: 12 });
              }}
              sx={{
                color: "white",
                backgroundColor: "#039be5",
                textTransform: "lowercase",
                borderRadius: "20px",
                boxShadow: 0,
              }}
            >
              {plan.title === "Premium" && (
                <CheckIcon sx={{ fontSize: "16px", color: "white" }} />
              )}

              {plan.title === "Premium" ? "chosen" : "choose plan"}
            </Button>
          </Stack>
        </Stack>
      </Stack>
      {plan.title && (
        <Stack>
          <Divider />
          <Stack
            sx={{ width: "fit-content", my: 4, display: "flex", rowGap: "4px" }}
          >
            <Typography component="div" variant="body1">
              Check out
            </Typography>
            <Typography component="div" variant="body2" color="GrayText">
              {plan.title} plan
            </Typography>
            <Divider />
            <Typography component="div" variant="body1" color="GrayText">
              total-${plan.value}
            </Typography>
            <Button
              variant="contained"
              onClick={() => toggleDrawer(true)}
              sx={{
                color: "white",
                backgroundColor: "limegreen",
                textTransform: "lowercase",
                boxShadow: 0,
                width: "300px",
              }}
            >
              pay directly
            </Button>
          </Stack>
        </Stack>
      )}
      <div ref={scrollCheckout} />
      {/* payment derawer */}
      {successPayment && (
        <Alert severity="success">
          The payment was successfully created !!!!.
        </Alert>
      )}
      <Drawer
        anchor="bottom" // Drawer comes from the bottom
        open={openDrawer}
        onClose={() => toggleDrawer(false)} // Close the drawer when clicked outside
      >
        <div
          style={{
            display: "flex",
            flexFlow: "colum nowrap",
            // alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper sx={{ minHeight: "200px", width: "300px", py: "30px" }}>
            {!session && (
              <Alert
                onClick={() => router.push("/api/auth/signin")}
                severity="warning"
              >
                To pay login first !!!.
              </Alert>
            )}
            <PayPalScriptProvider
              options={{
                clientId,
                currency: "USD",
                intent: "capture",
              }}
            >
              <PayPalButtons
                createOrder={createOrder}
                onApprove={approveOrder}
                style={{ layout: "vertical" }}
                disabled={session?.user?.id ? false : true}
              />
            </PayPalScriptProvider>
          </Paper>
        </div>
      </Drawer>
    </Stack>
  );
}
