"use client";
import { useState, useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditButton from "./editButton";
import { Stack, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { mutate } from "swr";
import { stone100, stone200 } from "@/lib/constants";
import Image from "next/image";
import CancelIcon from "@mui/icons-material/Cancel";

export default function EditProfileImageModal({ url }: { url: string }) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>(url);
  useEffect(() => {
    setPreviewImage(url);
    setImage(undefined);
  }, [open]);
  const onDrop = useCallback((acceptedFile: File[]) => {
    setImage(acceptedFile[0]);
    setPreviewImage(URL.createObjectURL(acceptedFile[0]));
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const removeFile = () => {
    setImage(undefined);
    setPreviewImage(url);
  };
  const handleUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("id", session?.user.id as string);
    formData.append("file", image as File);
    await axios
      .patch(`/api/user/image`, formData)
      .then(({ data }) => {
        if (data.success) {
          mutate(`/api/user/${session?.user.id}`);
          setOpen(false);
        }
      })
      .catch((err) => console.error(err));
    setLoading(false);
  };
  return (
    <>
      <EditButton open={open} setOpen={setOpen} />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Update</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <Stack spacing={1}>
            <Stack
              sx={{
                backgroundColor: stone100,
                p: 1,
                borderRadius: "16px",
              }}
            >
              {previewImage && (
                <Stack sx={{ position: "relative", height: "200px" }}>
                  {previewImage !== url && (
                    <CancelIcon
                      onClick={removeFile}
                      sx={{
                        color: "limegreen",
                        position: "absolute",
                        right: 0,
                        "&:hover": {
                          color: "tomato",
                        },
                        zIndex: 2,
                      }}
                    />
                  )}
                  <Image
                    src={previewImage}
                    alt={`profile-image`}
                    layout="fill"
                    objectFit="cover"
                    unoptimized // 🔥 Required for object URLs
                  />
                </Stack>
              )}
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Stack
                    sx={{
                      border: `2px solid ${stone200}`,
                      width: "fit-content",
                      px: 4,
                      borderRadius: "16px",
                      mt: 1,
                    }}
                  >
                    <CloudUploadIcon sx={{ color: "limegreen" }} />
                  </Stack>
                </Stack>
              </div>
            </Stack>
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
                size="small"
                variant="contained"
                disabled={!(previewImage === url) || !url}
                sx={{
                  backgroundColor: "tomato",
                  textTransform: "lowercase",
                  color: "white",
                  minWidth: 120,
                }}
                onClick={handleUpload}
              >
                {loading && previewImage === url ? (
                  <CircularProgress size={16} sx={{ color: "white" }} />
                ) : (
                  " delete"
                )}
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
                disabled={!image?.name }
                onClick={handleUpload}
              >
                {loading&&!(previewImage === url) ? (
                  <CircularProgress size={16} sx={{ color: "white" }} />
                ) : (
                  "upload"
                )}
              </Button>
            </DialogActions>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
