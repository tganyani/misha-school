"use client";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useSession } from "next-auth/react";
import useMediaQuery from "@mui/material/useMediaQuery";
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
import { mutate } from "swr";

type Inputs = {
  phone: string;
  courseId: string;
  description: string;
};

export default function BookModal({
  courses,
  tutorEmail,
  tutorName,
  tutorId,
  startAt,
  id,
  booked,
}: {
  courses: CourseType[];
  tutorEmail: string;
  tutorName: string;
  tutorId: number;
  startAt: string;
  id: string;
  booked: boolean;
}) {
  const { data: session } = useSession();
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
  const matches = useMediaQuery("(max-width:500px)");
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    await axios
      .post("/api/lesson", {
        ...data,
        tutorEmail,
        tutorId,
        subject: courses?.find((item) => item.id === Number(data.courseId))
          ?.title,
        startAt,
        studentId: session?.user.id,
        email: session?.user.email,
        id,
      })
      .then(({ data }) => {
        mutate(`/api/user/${tutorId}`);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };
  return (
    <>
      <Button
        disabled={booked}
        onClick={() => setOpen(true)}
        sx={{ textTransform: "lowercase", py: 0, backgroundColor: "limegreen" }}
        variant="contained"
        size="small"
      >
        {booked ? "booked" : "book now"}
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm"   sx={{}}>
        <DialogTitle variant="body1">
          You are booking a lesson from{" "}
          <span style={{ fontWeight: "bold" }}>{tutorName}</span>
        </DialogTitle>
        <DialogContent sx={{padding:1}}>
          <Stack spacing={2} py={1}>
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
              <InputLabel>choose course</InputLabel>
              <Controller
                name="courseId"
                control={control}
                render={({ field }) => (
                  <Select {...field}>
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
                  "Book now"
                )}
              </Button>
            </DialogActions>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
