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
import { Stack, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useRouter } from "next/navigation";

type Inputs = {
  email: string;
};

export default function ForgotPasswordModal() {
  const router = useRouter();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [logError, setLogError] = useState<string>("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {},
  });
  const values = watch();
  const allFilled = Object.values(values).every(
    (val) => val && val.trim() !== ""
  );
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    await axios
      .post("/api/fpassword", data)
      .then(({ data }) => {
        setLogError(data?.error);
        if (data.codeSend) {
          router.push(
            `/vf?email=${encodeURIComponent(
              data?.email
            )}&fpassword=${encodeURIComponent(true)}`
          );
        }
      })
      .catch((err) => console.error(err));
    setLoading(false);
  };
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        sx={{
          textTransform: "lowercase",
          color: "limegreen",
          width: "fit-content",
        }}
      >
        forgot password
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Forgot password?</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0, minWidth: "500px" }}>
          <Stack spacing={2} sx={{ py: 2 }}>
            <Typography
              variant="body2"
              component="div"
              sx={{ color: "tomato" }}
              role="alert"
            >
              {logError}
            </Typography>
            <TextField
              {...register("email", { required: true })}
              label="Enter email "
              id="outlined-size-small"
              defaultValue=""
              size="small"
              sx={{
                width: "100%",
              }}
            />
            {errors.email && (
              <Typography
                component="div"
                variant="body2"
                sx={{ color: "tomato" }}
              >
                this field is required
              </Typography>
            )}
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
                  "get code"
                )}
              </Button>
            </DialogActions>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
