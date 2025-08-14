"use client";
import Image from "next/image";
import styles from "../styles/NavBar.module.scss";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import useMediaQuery from "@mui/material/useMediaQuery";
import { usePathname } from "next/navigation";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import Paper from "@mui/material/Paper";
import { Divider, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

import { stringToColor } from "@/helper";
import axios from "axios";

const NavBar = () => {
  const matches = useMediaQuery("(max-width:600px)");
  const router = useRouter();
  const pathname = usePathname();
  const [openLinks, setOpenLinks] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // session data
  const { data: session, update } = useSession();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChaangeRole = async (role: string) => {
    await axios
      .post("/api/auth/role", { role, id: session?.user.id })
      .then(async ({ data }) => {
        await update({
          user: {
            ...session?.user,
            Role: data?.Role,
          },
        });
      })
      .catch((err) => console.error(err));
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
          <ul
            className={
              openLinks && matches ? styles.openNavLinks : styles.navLinks
            }
          >
            <li
              onClick={() => setOpenLinks(false)}
              style={
                pathname === "/"
                  ? { backgroundColor: "limegreen", color: "white" }
                  : {}
              }
            >
              <Link href="/">home</Link>
            </li>

            {session?.user.Role === "admin" && (
              <li
                onClick={() => setOpenLinks(false)}
                style={
                  pathname === "/admin"
                    ? { backgroundColor: "limegreen", color: "white" }
                    : {}
                }
              >
                <Link href="/admin">dashboard</Link>
              </li>
            )}
            <li
              onClick={() => setOpenLinks(false)}
              style={
                pathname === "/tutors"
                  ? { backgroundColor: "limegreen", color: "white" }
                  : {}
              }
            >
              <Link href="/tutors" style={{ whiteSpace: "nowrap" }}>
                tutors
              </Link>
            </li>
            {session && (
              <li
                onClick={() => setOpenLinks(false)}
                style={
                  pathname === "/lessons"
                    ? { backgroundColor: "limegreen", color: "white" }
                    : {}
                }
              >
                <Link href="/lessons" style={{ whiteSpace: "nowrap" }}>
                  lessons
                </Link>
              </li>
            )}

            {(session?.user.Role === "tutor" ||
              session?.user.Role === "admin") && (
              <li
                onClick={() => setOpenLinks(false)}
                style={
                  pathname === "/av"
                    ? { backgroundColor: "limegreen", color: "white" }
                    : {}
                }
              >
                <Link href="/av" style={{ whiteSpace: "nowrap" }}>
                  availability
                </Link>
              </li>
            )}
            {session && (
              <li
                onClick={() => setOpenLinks(false)}
                style={
                  pathname === "/schedule"
                    ? { backgroundColor: "limegreen", color: "white" }
                    : {}
                }
              >
                <Link href="/schedule" style={{ whiteSpace: "nowrap" }}>
                  schedule
                </Link>
              </li>
            )}
            {!session && (
              <li
                onClick={() => setOpenLinks(false)}
                style={
                  pathname === "/signup"
                    ? { backgroundColor: "limegreen", color: "white" }
                    : {}
                }
              >
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
            sx={{ py: 0 }}
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
            {session && (
              <MenuItem onClick={handleClose}>
                <Typography variant="body2" component="div">
                  {session?.user.name}
                </Typography>
              </MenuItem>
            )}
            {session && <Divider />}

            <MenuItem
              onClick={() => {
                router.push("/pf");
                handleClose();
              }}
            >
              {session && (
                <Typography variant="body2" component="div">
                  Profile
                </Typography>
              )}
            </MenuItem>
            {session && (
              <MenuItem
                onClick={() => {
                  handleClose();
                }}
              >
                {session?.user?.Role === "student" ? (
                  <Typography
                    variant="body2"
                    component="div"
                    onClick={() => handleChaangeRole("tutor")}
                  >
                    become tutor
                  </Typography>
                ) : (
                  <Typography
                    variant="body2"
                    component="div"
                    onClick={() => handleChaangeRole("student")}
                  >
                    become student
                  </Typography>
                )}
              </MenuItem>
            )}
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
                  sx={{
                    color: "tomato",
                    width: "150px",
                    border: "2px solid tomato",
                    borderRadius: "16px",
                    display: "flex",
                    flexFlow: "row nowrap",
                    columnGap: "8px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  component="div"
                >
                  <span>LogOut</span>
                  <LogoutIcon sx={{ fontSize: "16px" }} />
                </Typography>
              ) : (
                <Typography
                  variant="body2"
                  component="div"
                  sx={{
                    color: "limegreen",
                    width: "150px",
                    border: "2px solid limegreen",
                    borderRadius: "16px",
                    display: "flex",
                    flexFlow: "row nowrap",
                    columnGap: "8px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span> LogIn</span>
                  <LoginIcon sx={{ fontSize: "16px" }} />
                </Typography>
              )}
            </MenuItem>
          </Menu>
        </div>
      </div>
    </Paper>
  );
};

export default NavBar;
