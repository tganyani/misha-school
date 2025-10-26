"use client";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Button from "@mui/material/Button";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
// ***************************************
import styles from "@/styles/signup.module.scss";
import { useState } from "react";
import GoogleButton from "@/components/googleBtn";

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  Role: string;
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
    control,
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
      .then(({ data }) => {
        if (data.created) {
          router.push(`/vf?email=${encodeURIComponent(data?.email)}`);
        } else {
          setResponseMsg(data.err);
        }
      })
      .catch((err) => console.log(err));

    setLoadingSignUp(false);
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
          sx={{}}
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
          sx={{}}
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
        <FormControl fullWidth size="small">
          <InputLabel>account type</InputLabel>
          <Controller
            name="Role"
            control={control}
            defaultValue="student"
            render={({ field }) => (
              <Select {...field} label="account type">
                <MenuItem value="student">student</MenuItem>
                <MenuItem value="tutor">tutor</MenuItem>
              </Select>
            )}
          />
        </FormControl>
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
          register
        </Button>
        <Typography variant="body1" component="div">
          Already registered ?
          <Button
            variant="text"
            sx={{ textTransform: "lowercase" }}
            onClick={() => router.push("/signin")}
          >
            login
          </Button>
        </Typography>
        <GoogleButton/>
      </div>
    </div>
  );
};

export default SingUp;
