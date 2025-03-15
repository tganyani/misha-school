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
import { LanguageType, userProfileType } from "@/lib/user-types";
import CancelButton from "./cancelBtn";

type Inputs = {
  name: string;
  level: string;
};

export default function EditLanguageModal({
  languages,
}: {
  languages: LanguageType[];
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
    reset,
  } = useForm<Inputs>({
    defaultValues: {},
  });
  const values = watch();
  const allFilled = Object.values(values).every(
    (val) => val && val.trim() !== ""
  );
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    mutate<userProfileType>(
      `/api/user/${session?.user.id}`,
      (currentData) => {
        if (!currentData) return undefined; // important safety

        return {
          ...currentData,
          languages: [
            ...currentData.languages,
            { ...data, id: String(new Date()) },
          ],
        };
      },
      false // false means: don't revalidate after mutation
    );
    await axios
      .post(`/api/lg`, { ...data, userId: session?.user.id })
      .then(({ data }) => {
        if (data.created) {
          mutate(`/api/user/${session?.user.id}`);
          //   setOpen(false);
          reset({ name: "", level: "conversational" });
        }
      })
      .catch((err) => console.error(err));
  };
  const handleDelete = async (id: string) => {
    mutate<userProfileType>(
      `/api/user/${session?.user.id}`,
      (currentData) => {
        if (!currentData) return undefined; // important safety

        return {
          ...currentData,
          languages: currentData.languages.filter(
            (language) => language.id !== id
          ),
        };
      },
      false // false means: don't revalidate after mutation
    );
    await axios
      .delete(`/api/lg/${id}`)
      .then(({ data }) => {
        if (data.id) {
          `/api/user/${session?.user.id}`;
          //   setOpen(false);
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      <EditButton open={open} setOpen={setOpen} />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Update languages</DialogTitle>
        <DialogContent
          sx={{ paddingBottom: 0, minWidth: "500px", marginBottom: "4px" }}
        >
          <Stack
            sx={{
              display: "flex",
              flexFlow: "row wrap",
              gap: "8px",
              border: "2px solid #F3F4F6",
              borderRadius: "12px",
              padding: "8px",
              marginBottom: "8px",
            }}
          >
            {languages?.map((language) => (
              <Stack
                key={language.id}
                sx={{
                  backgroundColor: "#F5F5F4",
                  borderRadius: "12px",
                  padding: "4px",
                }}
              >
                <Typography variant="body2" component="div">
                  {language.name}
                </Typography>
                <Typography variant="body2" color="GrayText" component="div">
                  {language.level}
                </Typography>
                <CancelButton id={language.id} handleDelete={handleDelete} />
              </Stack>
            ))}
          </Stack>
          <Stack spacing={2}>
            <TextField
              {...register("name", { required: true })}
              label="name"
              id="outlined-size-small"
              defaultValue=""
              size="small"
              sx={{
                width: "100%",
              }}
            />
            <FormControl fullWidth size="small">
              <InputLabel>level</InputLabel>
              <Controller
                name="level"
                control={control}
                defaultValue="conversational"
                render={({ field }) => (
                  <Select {...field}>
                    <MenuItem value="conversational">conversational</MenuItem>
                    <MenuItem value="intermediate">intermediate</MenuItem>
                    <MenuItem value="fluent">fluent</MenuItem>
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
