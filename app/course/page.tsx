"use client";
import styles from "@/styles/addCourse.module.scss";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface IFormInput {
  title: string;
  description: string;
  level: string;
}

const CreateCourse = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<IFormInput>();
  const [display, setDisplay] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    await axios
      .post("/api/course/create", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setDisplay(true);

        if (res.data.msg === "created") {
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      })
      .catch((err) => {
        setDisplay(true);
        setSuccess(false);
        console.log(err);
      });
    setTimeout(() => setLoading(false), 1000);

    setTimeout(() => setDisplay(false), 2000);
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography variant="body1" component="div">
          Add new course
        </Typography>
      </div>
      <div className={styles.inner}>
        {display && (
          <Alert
            variant="filled"
            severity={success ? "success" : "error"}
            sx={{ width: "450px" }}
          >
            {success
              ? "course successfuly created"
              : "error while creating the job"}
          </Alert>
        )}
        <TextField
          label="title"
          size="small"
          sx={{ width: "450px" }}
          {...register("title", { required: true })}
          aria-invalid={errors.title ? "true" : "false"}
        />
        {errors.title?.type === "required" && (
          <Typography
            variant="body2"
            component="div"
            sx={{ color: "tomato" }}
            role="alert"
          >
            title is required
          </Typography>
        )}
        <TextField
          label="description"
          multiline
          minRows={4}
          sx={{ width: "450px" }}
          {...register("description", { required: true })}
          aria-invalid={errors.description ? "true" : "false"}
        />
        {errors.description?.type === "required" && (
          <Typography
            variant="body2"
            component="div"
            sx={{ color: "tomato" }}
            role="alert"
          >
            description is required
          </Typography>
        )}
        <TextField
          select
          label="Select"
          defaultValue="primary"
          helperText="Please select course level"
          sx={{ width: "450px" }}
          {...register("level", { required: true })}
          aria-invalid={errors.level ? "true" : "false"}
        >
          {["primary", "secondary", "university"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        {errors.level?.type === "required" && (
          <Typography
            variant="body2"
            component="div"
            sx={{ color: "tomato" }}
            role="alert"
          >
            level is required
          </Typography>
        )}

        <TextField
          focused
          label="cover image"
          type="file"
          sx={{ width: "450px" }}
        />
        <div style={{ width: "450px" }}>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            size="small"
            sx={{
              textTransform: "lowercase",
              backgroundColor: "limegreen",
              width: "200px",
              "&:hover": {
                backgroundColor: "lawngreen",
              },
            }}
          >
            {loading ? <CircularProgress size={20} sx={{color:"white"}}/> : "submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
