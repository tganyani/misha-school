"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

type Inputs = {
  email: string;
  phone: string;
  description: string;
};

export default function InviteTutorModal({
  tutorEmail,
  tutorName,
}: {
  tutorEmail: string;
  tutorName: string;
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
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    await axios
      .post("/api/invite-tutor", {
        ...data,
        tutorEmail,
      })
      .then(({ data }) => {
        console.log(data);
        setOpen(false)
      })
      .catch((err) => console.log(err));
    setLoading(false);
    
  };
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        size="small"
        sx={{
          textTransform: "lowercase",
          backgroundColor: "limegreen",
          width:"fit-content"
        }}
      >
        Invite tutor
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth={true}
        maxWidth="sm"
      >
        
          <DialogTitle variant="body2">You are inviting  <span style={{fontWeight:"bold"}}>{tutorName}</span></DialogTitle>
          
        <DialogContent sx={{ paddingBottom: 0, px: 2 }}>
          <Stack spacing={2} py={1}>
            <TextField
              {...register("email", { required: true })}
              label="Enter your email"
              id="outlined-size-small"
              defaultValue={session?.user?.email}
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
                  "Invite tutor"
                )}
              </Button>
            </DialogActions>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
