"use client";
import { useState } from "react";
import {
  nanoLightTheme,
  radiantLightTheme,
  AppBar,
  LocalesMenuButton,
  ToggleThemeButton,
  LoadingIndicator,
  houseLightTheme,
  defaultLightTheme,
  bwLightTheme,
} from "react-admin";

import PaletteIcon from "@mui/icons-material/Palette";
import { Popover, MenuItem, List, ListItemText, Button } from "@mui/material";

import { useAppDispatch } from "@/lib/hooks";
import { setTheme } from "@/lib/features/theme/themeSlice";

export const MyAppBar = () => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <AppBar
      color="primary"
      position="relative"
      toolbar={
        <>
          <LocalesMenuButton />
          <Button
            sx={{
              boxShadow: 0,
              backgroundColor: "inherit" ,
              "&:hover": { boxShadow: 0, backgroundColor: "inherit" },
            }}
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
          >
            <PaletteIcon />
          </Button>

          <ToggleThemeButton />
          <LoadingIndicator />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <List>
              <MenuItem
                onClick={() => {
                  dispatch(setTheme(defaultLightTheme));
                  window.location.reload();
                }}
              >
                <ListItemText primary="default" />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(setTheme(bwLightTheme));
                  window.location.reload();
                }}
              >
                <ListItemText primary="b&w" />
              </MenuItem>
              <MenuItem
                onClick={async () => {
                  dispatch(setTheme(nanoLightTheme));
                  window.location.reload();
                  
                }}
              >
                <ListItemText primary="nano" />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(setTheme(radiantLightTheme));
                  window.location.reload();
                }}
              >
                <ListItemText primary="radiant" />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(setTheme(houseLightTheme));
                  window.location.reload();
                }}
              >
                <ListItemText primary="house" />
              </MenuItem>
            </List>
          </Popover>
        </>
      }
    />
  );
};
