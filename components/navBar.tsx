"use client";
import Image from "next/image";
import styles from "../styles/NavBar.module.scss";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import Paper from "@mui/material/Paper";
import { Divider, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";

import { stringToColor } from "@/helper";

const NavBar = () => {
  const router = useRouter();
  const [openLinks, setOpenLinks] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // session data
  const { data: session } = useSession();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Paper className={styles.container1} elevation={0}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image src={"/eye.png"} width={60} height={50} alt="logo" />
        </div>
        <div className={styles.center}>
          <div
            className={styles.menuIcon}
            onClick={() => setOpenLinks(!openLinks)}
          >
            <MenuIcon />
          </div>
          <ul className={openLinks ? styles.openNavLinks : styles.navLinks}>
            <li>
              <Link href="/">home</Link>
            </li>

            {session?.user.Role === "admin" && (
              <li>
                <Link href="/admin">dashboard</Link>
              </li>
            )}
            <li>
              <Link href="/tutors" style={{ whiteSpace: "nowrap" }}>
                tutors
              </Link>
            </li>

            <li>
              <Link href="/lessons" style={{ whiteSpace: "nowrap" }}>
                {" "}
                lessons
              </Link>
            </li>
            <li>
              <Link href="/av" style={{ whiteSpace: "nowrap" }}>
                {" "}
                availability
              </Link>
            </li>
            <li>
              <Link href="/schedule" style={{ whiteSpace: "nowrap" }}>
                {" "}
                schedule
              </Link>
            </li>
            {!session && (
              <li>
                <Link href="/signup" style={{ whiteSpace: "nowrap" }}>
                  {" "}
                  register
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {session ? (
              <Avatar
                sx={{
                  bgcolor: stringToColor(session?.user?.name as string),
                  width: 24,
                  height: 24,
                }}
              >
                {session?.user?.name?.split("")[0]}
              </Avatar>
            ) : (
              <AccountCircleIcon sx={{ color: "grey" }} />
            )}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            elevation={0}
          >
            <MenuItem onClick={handleClose}>
              <Typography variant="body2" component="div">
                {session?.user.name}
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={
                session
                  ? () => signOut()
                  : () => router.push("/api/auth/signin")
              }
            >
              {session ? (
                <Typography
                  variant="body2"
                  sx={{ color: "tomato" }}
                  component="div"
                >
                  LogOut
                </Typography>
              ) : (
                <Typography variant="body2" component="div">
                  LogIn
                </Typography>
              )}
            </MenuItem>
            <MenuItem
              onClick={() => {
                router.push("/pf");
                handleClose();
              }}
            >
              <Typography variant="body2" component="div">
                Profile
              </Typography>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </Paper>
  );
};

export default NavBar;
