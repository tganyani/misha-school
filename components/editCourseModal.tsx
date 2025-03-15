"use client";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useSession } from "next-auth/react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditButton from "./editButton";
import { Stack, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { mutate } from "swr";
import AddButton from "./addBtn";

type Inputs = {
  title: string;
  description: string;
  level: string;
};

export default function EditCourseModal({
  title,
  description,
  level,
  editMode,
  id,
}: {
  title: string;
  description: string;
  level: string;
  editMode: boolean;
  id: number | undefined;
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
  } = useForm<Inputs>({
    defaultValues: {
      title,
      description,
      level,
    },
  });
  const values = watch();
  const allFilled = Object.values(values).every(
    (val) => val && val.trim() !== ""
  );
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    if (editMode) {
      await axios
        .patch(`/api/course/${id}`, data)
        .then(({ data }) => {
          if (data.id) {
            setOpen(false);
          }
        })
        .catch((err) => console.error(err));
    } else {
      await axios
        .post(`/api/course`, { ...data, tutorId: session?.user.id })
        .then(({ data }) => {
          if (data.id) {
            setOpen(false);
          }
        })
        .catch((err) => console.error(err));
    }
    setLoading(false);
    mutate(`/api/user/${session?.user.id}`);
  };
  return (
    <>
      {editMode ? (
        <EditButton open={open} setOpen={setOpen} />
      ) : (
        <AddButton open={open} setOpen={setOpen} />
      )}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editMode ? "Update course" : "Add course"}</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0, minWidth: "500px" }}>
          <Stack spacing={2}>
            <TextField
              {...register("title", { required: true })}
              label="name"
              id="outlined-size-small"
              defaultValue=""
              size="small"
              sx={{
                width: "100%",
              }}
            />
            <TextField
              {...register("description", { required: true })}
              label="description"
              id="outlined-size-small"
              defaultValue=""
              size="small"
              multiline
              minRows={4}
              sx={{
                width: "100%",
              }}
            />
            {errors.description && (
              <Typography
                component="div"
                variant="body2"
                sx={{ color: "tomato" }}
              >
                this field is required
              </Typography>
            )}
            <FormControl fullWidth size="small">
              <InputLabel>level</InputLabel>
              <Controller
                name="level"
                control={control}
                defaultValue="primary"
                render={({ field }) => (
                  <Select {...field}>
                    <MenuItem value="primary">Primary</MenuItem>
                    <MenuItem value="secondary">Secondary</MenuItem>
                    <MenuItem value="university">University</MenuItem>
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
                  "update"
                )}
              </Button>
            </DialogActions>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
