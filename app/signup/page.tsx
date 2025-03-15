"use client";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Button from "@mui/material/Button";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
// ***************************************
import styles from "@/styles/signup.module.scss";
import { useState } from "react";

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SingUp = () => {
  const router = useRouter();
  const [loodingSignUp, setLoadingSignUp] = useState<boolean>(false);
  const [responseMsg, setResponseMsg] = useState<string>("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<IFormInput>({
    defaultValues: {
      password: "",
    },
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoadingSignUp(true);
    await axios
      .post("/api/signup", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => router.push("/api/auth/signin"))
      .catch((err) => setResponseMsg(err.response?.data?.error));
    
    setTimeout(()=>setLoadingSignUp(false),1000)
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
          label="first name"
          defaultValue=""
          size="small"
          {...register("firstName", { required: true })}
          aria-invalid={errors.firstName ? "true" : "false"}
          sx={{ width: "200px" }}
        />
        {errors.firstName?.type === "required" && (
          <Typography
            variant="body2"
            component="div"
            sx={{ color: "tomato" }}
            role="alert"
          >
            first name is required
          </Typography>
        )}
        <TextField
          label="last name"
          defaultValue=""
          size="small"
          {...register("lastName", { required: true })}
          sx={{ width: "200px" }}
        />
        {errors.lastName?.type === "required" && (
          <Typography
            variant="body2"
            component="div"
            sx={{ color: "tomato" }}
            role="alert"
          >
            last name is required
          </Typography>
        )}
        <TextField
          label="email"
          defaultValue=""
          size="small"
          type="email"
          {...register("email", { required: true })}
          sx={{ width: "200px" }}
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
          sx={{ width: "200px" }}
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

        <div style={{ display: "flex", flexFlow: "row nowrap" }}>
          <TextField
            label="confirm password"
            defaultValue=""
            size="small"
            type="password"
            {...register("confirmPassword", { required: true })}
            sx={{ width: "200px" }}
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
        </div>
        <Button
          disabled={loodingSignUp}
          onClick={handleSubmit(onSubmit)}
          sx={{
            backgroundColor: "limegreen",
            color: "white",
            width: "200px",
            textTransform:"lowercase",
            "&:hover": {
              backgroundColor: "lawngreen",
            },
          }}
        >
          register
        </Button>
        <Typography variant="body1" component="div">
          Already registered ?
          <Button
            variant="text"
            sx={{ textTransform: "lowercase" }}
            onClick={() => router.push("/api/auth/signin")}
          >
            login
          </Button>
        </Typography>
      </div>
    </div>
  );
};

export default SingUp;
