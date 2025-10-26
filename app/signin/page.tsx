"use client";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Button from "@mui/material/Button";
import { signIn } from "next-auth/react";
// ***************************************
import styles from "@/styles/signup.module.scss";
import { useState } from "react";
import ForgotPasswordModal from "@/components/forgotPasswordModal";
import GoogleButton from "@/components/googleBtn";


interface IFormInput {
  email: string;
  password: string;
}

const SingIn = () => {
  const router = useRouter();
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

    signIn("credentials", { ...data, callbackUrl: "/" });

    setTimeout(() => setLoadingSignUp(false), 1000);
  };
  return (
    <div className={styles.container}>
      <div className={styles.usercon}>
        <PersonAddAltIcon sx={{ color: "limegreen" }} />
      </div>
      <div>
        <Typography
          variant="body2"
          component="div"
          sx={{ color: "tomato" }}
          role="alert"
        >
          {responseMsg}
        </Typography>
      </div>
      <div className={styles.form}>
        <TextField
          label="email"
          defaultValue=""
          size="small"
          type="email"
          {...register("email", { required: true })}
          sx={{}}
        />
        {errors.email?.type === "required" && (
          <Typography
            variant="body2"
            component="div"
            sx={{ color: "tomato" }}
            role="alert"
          >
            email is required
          </Typography>
        )}
        <TextField
          label="password"
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

        <Stack
          sx={{
            display: "flex",
            flexFlow: "row nowrap",
            justifyContent: "flex-end",
          }}
        >
          <ForgotPasswordModal />
        </Stack>

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
          login
        </Button>
        <Typography variant="body1" component="div">
          Don`t have account ?
          <Button
            variant="text"
            sx={{ textTransform: "lowercase" }}
            onClick={() => router.push("/signup")}
          >
            register
          </Button>
        </Typography>
          <GoogleButton/>
      </div>
    
    </div>
  );
};

export default SingIn;
