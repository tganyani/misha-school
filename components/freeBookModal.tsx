"use client";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { CourseType } from "@/lib/user-types";

type Inputs = {
  email: string;
  phone: string;
  courseId: string;
  description: string;
};

export default function FreeBookModal({
  courses,
  tutorEmail,
  tutorName,
  tutorId,
}: {
  courses: CourseType[];
  tutorEmail: string;
  tutorName: string;
  tutorId: number;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>({});
  const values = watch();
  const allFilled = Object.values(values).every(
    (val) => val && val.trim() !== ""
  );
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    await axios
      .post("/api/free", {
        ...data,
        tutorEmail,
        tutorId,
        subject: courses?.find((item) => item.id === Number(data.courseId))
          ?.title,
      })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        sx={{
          textTransform: "lowercase",
          backgroundColor: "limegreen",
        }}
      >
        Book free trial
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle variant="body1">
          You are booking a free lesson from{" "}
          <span style={{ fontWeight: "bold" }}>{tutorName}</span>
        </DialogTitle>
        <DialogContent sx={{ paddingBottom: 0,px:2 }}>
          <Stack spacing={2} py={1}>
            <TextField
              {...register("email", { required: true })}
              label="Enter your email"
              id="outlined-size-small"
              defaultValue=""
              size="small"
              sx={{
                width: "100%",
              }}
            />
            <TextField
              {...register("phone", { required: true })}
              label="whatsapp number"
              id="outlined-size-small"
              defaultValue=""
              size="small"
              sx={{
                width: "100%",
              }}
            />
            {errors.phone && (
              <Typography
                component="div"
                variant="body2"
                sx={{ color: "tomato" }}
              >
                this field is required
              </Typography>
            )}
            <TextField
              {...register("description", { required: true })}
              label="write something"
              defaultValue=""
              size="small"
              multiline
              minRows={4}
              sx={{
                width: "100%",
              }}
            />
            <FormControl fullWidth size="small">
              <InputLabel >choose course</InputLabel>
              <Controller
                name="courseId"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="choose course" >
                    {courses.map((item) => (
                      <MenuItem key={item.id} value={String(item.id)}>
                        {item.title}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
            <DialogActions>
              <Button
                disabled={loading}
                onClick={() => setOpen(false)}
                sx={{
                  textTransform: "lowercase",
                }}
              >
                cancel
              </Button>
              <Button
                type="submit"
                size="small"
                variant="contained"
                sx={{
                  backgroundColor: "limegreen",
                  textTransform: "lowercase",
                  color: "white",
                  minWidth: 120,
                }}
                disabled={!allFilled || loading}
                onClick={handleSubmit(onSubmit)}
              >
                {loading ? (
                  <CircularProgress size={16} sx={{ color: "white" }} />
                ) : (
                  "Book for free"
                )}
              </Button>
            </DialogActions>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
