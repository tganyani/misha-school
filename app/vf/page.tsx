"use client";
import { useState } from "react";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { Button } from "@mui/material";
import OtpInput from "react-otp-input";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Suspense } from "react";

function VerifyComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const fpasswsord = searchParams.get("fpassword");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [logError, setLogError] = useState<string>("");

  const handleVerify = async () => {
    setLoading(true);
    await axios
      .post("/api/verify", {
        code: otp.trim(),
        email,
      })
      .then(async ({ data }) => {
        setLogError(data?.error);
        if (data.verified) {
          if (fpasswsord) {
            router.push(`/rp?email=${encodeURIComponent(data?.email)}`);
          } else {
            router.push("/signin");
          }
        }
      })
      .catch((err) => console.error(err));
    setLoading(false);
  };

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Typography variant="body1" component="div">
        Email send to
      </Typography>
      <Typography variant="body2" component="div">
        {email}
      </Typography>
      <Stack sx={{ mt: 4 }} spacing={4}>
        <Typography
          variant="body2"
          component="div"
          sx={{ color: "tomato" }}
          role="alert"
        >
          {logError}
        </Typography>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          inputStyle={{
            width: "3rem",
            height: "3rem",
            // margin: "0 0.5rem",
            fontSize: "1.5rem",
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
          renderInput={(props) => <input {...props} />}
        />
        <Button
          disabled={loading}
          variant="contained"
          sx={{ textTransform: "lowercase", bgcolor: "limegreen" }}
          onClick={handleVerify}
        >
          verify
        </Button>
      </Stack>
    </Stack>
  );
}

export default function VerifyPassword() {
  return (
    <Suspense fallback={<CircularProgress sx={{ fontSize: "i6px" }} />}>
      <VerifyComponent />
    </Suspense>
  );
}
