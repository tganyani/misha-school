"use client";
import { useState } from "react";
import styles from "../styles/footer.module.scss";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import PeopleIcon from "@mui/icons-material/People";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GavelIcon from "@mui/icons-material/Gavel";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { stone400 } from "@/lib/constants";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CircularProgress } from "@mui/material";
import axios from "axios";

type Inputs = {
  email: string;
  description: string;
};

const Footer = () => {
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
      email: session?.user?.email as string,
      description: "",
    },
  });
  const values = watch();
  const allFilled = Object.values(values).every(
    (val) => val && val.trim() !== ""
  );
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    await axios
      .post("/api/contact-us", data)
      .then(({ data }) => {
        console.log(data);
        setOpen(false);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.about}>
          <Typography sx={{ color: "#eeeeee" }} variant="h6" component="div">
            contact us
          </Typography>
          <List>
            <ListItem
              disablePadding
              sx={{ "&:hover": { backgroundColor: "limegreen" } }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <WhatsAppIcon sx={{ color: "#25D366" }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={{ color: "#fdfff5" }}
                      variant="body2"
                      component="div"
                    >
                      +79258534128 / +33752278870
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              onClick={handleClickOpen}
              sx={{
                border: `2px solid ${stone400}`,
                borderRadius: "30px",
                "&:hover": { backgroundColor: "limegreen" },
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <EmailIcon sx={{ color: "#d44638" }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={{ color: "#fdfff5" }}
                      variant="body2"
                      component="div"
                    >
                      email us availabe 24/7
                    </Typography>
                  }
                />{" "}
                {/*clasesconjose@outlook.com*/}
              </ListItemButton>
            </ListItem>
          </List>
        </div>
        <div className={styles.statistics}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ color: "#eeeeee" }}
          >
            statistics
          </Typography>
          <List>
            <ListItem
              disablePadding
              sx={{ "&:hover": { backgroundColor: "limegreen" } }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <PeopleIcon sx={{ color: "#9e9e9e", fontSize: "18px" }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={{ color: "#fdfff5" }}
                      variant="body2"
                      component="div"
                    >
                      7 000 active leaners and tutors
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ "&:hover": { backgroundColor: "limegreen" } }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <MenuBookIcon sx={{ color: "#9e9e9e", fontSize: "18px" }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={{ color: "#fdfff5" }}
                      variant="body2"
                      component="div"
                    >
                      500 total courses available
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
        <div className={styles.more}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ color: "#eeeeee" }}
          >
            more
          </Typography>
          <List>
            <ListItem
              disablePadding
              sx={{ "&:hover": { backgroundColor: "limegreen" } }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <GavelIcon sx={{ color: "#9e9e9e", fontSize: "18px" }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={{ color: "#fdfff5" }}
                      variant="body2"
                      component="div"
                    >
                      Terms
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ "&:hover": { backgroundColor: "limegreen" } }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <PrivacyTipIcon sx={{ color: "#9e9e9e", fontSize: "18px" }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={{ color: "#fdfff5" }}
                      variant="body2"
                      component="div"
                    >
                      Privacy
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ "&:hover": { backgroundColor: "limegreen" } }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <AccessibilityIcon
                    sx={{ color: "#9e9e9e", fontSize: "18px" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={{ color: "#fdfff5" }}
                      variant="body2"
                      component="div"
                    >
                      Accessibility
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </div>
      <Divider />
      <div className={styles.bottom}>
        &copy; {new Date().getFullYear()} All Rights Reserved
      </div>
      {/* this is the modal for the email */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>email us</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              marginBottom: "20px",
            }}
          >
            You can email us at{" "}
            <span style={{ fontStyle: "italic", color: "black" }}>
              clasesconjose@outlook.com
            </span>{" "}
            directly from this website
          </DialogContentText>
          <TextField
            focused
            required
            margin="dense"
            id="name"
            label="your email Address"
            type="email"
            fullWidth
            variant="outlined"
            size="small"
            defaultValue={session?.user?.email}
            sx={{
              marginBottom: "20px",
            }}
            {...register("email", { required: true })}
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
          <TextField
            id="message"
            multiline
            label="your message"
            variant="outlined"
            focused
            fullWidth
            minRows={3}
            {...register("description", { required: true })}
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
        </DialogContent>
        <DialogActions sx={{ padding: "22px" }}>
          <Button onClick={handleClose} sx={{ textTransform: "lowercase" }}>
            cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            type="submit"
            sx={{
              textTransform: "lowercase",
              backgroundColor: "limegreen",
              minWidth: "100px",
            }}
            disabled={!allFilled || loading}
            onClick={handleSubmit(onSubmit)}
          >
            {loading ? (
              <CircularProgress size={16} sx={{ color: "white" }} />
            ) : (
              "send"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Footer;
