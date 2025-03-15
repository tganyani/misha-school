"use client";
import { SidebarClasses, useLocale, useSidebarState } from "react-admin";

import { Drawer } from "@mui/material";

export const MySidebar = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [open, setOpen] = useSidebarState();
  useLocale(); // force redraw on locale change

  const toggleSidebar = () => setOpen(!open);

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={toggleSidebar}
      classes={SidebarClasses}
    >
      {children}
    </Drawer>
  );
};
