"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { CircularProgress, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
// ***************************************
import styles from "@/styles/signup.module.scss";
import { useState } from "react";

interface IFormInput {
  password: string;
  confirmPassword: string;
}

const ResetPasswordComponent = () => {
  const searchParams = useSearchParams();

  const router = useRouter();
  const email = searchParams.get("email");
  const [loodingSignUp, setLoadingSignUp] = useState<boolean>(false);
  const [responseMsg, setResponseMsg] = useState<string>("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    control,
  } = useForm<IFormInput>({
    defaultValues: {
      password: "",
    },
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoadingSignUp(true);
    await axios
      .post("/api/rpassword", { password: data.password, email })
      .then(({ data }) => {
        if (data.reset) {
          router.push(`/signin`);
        }
      })
      .catch((err) => console.error(err));
    setLoadingSignUp(false);
  };
  return (
    <div className={styles.container}>
      <Stack>
        <Typography variant="body1" component="div" role="alert">
          Reset Password
        </Typography>
      </Stack>
      <div className={styles.form}>
        <TextField
          label="new password"
          defaultValue=""
          size="small"
          type="password"
          {...register("password", { required: true })}
          sx={{}}
        />
        {errors.password?.type === "required" && (
          <Typography
            variant="body2"
            component="div"
            sx={{ color: "tomato" }}
            role="alert"
          >
            password is required
          </Typography>
        )}

        <TextField
          label="confirm password"
          defaultValue=""
          size="small"
          type="password"
          {...register("confirmPassword", { required: true })}
          sx={{}}
        />
        {watch("password") !== "" ? (
          watch("password") === watch("confirmPassword") ? (
            <CheckCircleOutlineIcon color="success" />
          ) : (
            <ErrorOutlineIcon color="error" />
          )
        ) : (
          " "
        )}
        <Button
          disabled={loodingSignUp}
          onClick={handleSubmit(onSubmit)}
          sx={{
            backgroundColor: "limegreen",
            color: "white",
            textTransform: "lowercase",
            "&:hover": {
              backgroundColor: "lawngreen",
            },
          }}
        >
          reset password
        </Button>
      </div>
    </div>
  );
};

export default function ResetPassword() {
  return (
    <Suspense fallback={<CircularProgress sx={{ fontSize: "i6px" }} />}>
      <ResetPasswordComponent />
    </Suspense>
  );
}
