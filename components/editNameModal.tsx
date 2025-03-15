"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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
import axios from "axios";
import { mutate } from "swr";

type Inputs = {
  firstName: string;
  lastName: string;
  hLeducation: string;
  country: string;
};

export default function EditNameModal({
  firstName,
  lastName,
  hLeducation,
  country,
}: Inputs) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      firstName,
      lastName,
      hLeducation,
      country,
    },
  });
  const values = watch();
  const allFilled = Object.values(values).every(
    (val) => val && val.trim() !== ""
  );
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    await axios
      .patch(`/api/user/${session?.user.id}`, data)
      .then(({ data }) => {
        if (data.updated) {
          setOpen(false);
        }
      })
      .catch((err) => console.error(err));
    setLoading(false);
    mutate(`/api/user/${session?.user.id}`);
  };
  return (
    <>
      <EditButton open={open} setOpen={setOpen} />
      <Dialog
        maxWidth="sm"
        fullWidth
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>Update</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0, px: 1}}>
          <Stack spacing={2} py={2}>
            <TextField
              {...register("firstName", { required: true })}
              label="first name"
              id="outlined-size-small"
              defaultValue=""
              size="small"
              sx={{
                width: "100%",
              }}
            />
            {errors.firstName && (
              <Typography
                component="div"
                variant="body2"
                sx={{ color: "tomato" }}
              >
                this field is required
              </Typography>
            )}
            <TextField
              label="last name"
              id="outlined-size-small"
              defaultValue=""
              size="small"
              sx={{
                width: "100%",
              }}
              {...register("lastName", { required: true })}
            />
            <TextField
              label="highest level of education"
              id="outlined-size-small"
              defaultValue=""
              size="small"
              sx={{
                width: "100%",
              }}
              {...register("hLeducation", { required: true })}
            />
            <TextField
              label="country"
              id="outlined-size-small"
              defaultValue=""
              size="small"
              sx={{
                width: "100%",
              }}
              {...register("country", { required: true })}
            />

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
