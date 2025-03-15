

import {
  Layout,
} from "react-admin";
import { MyMenu } from "./menu";
import { MyAppBar } from "./appBar";

export const MyLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => <Layout sx={{marginTop:"20px"}} menu={MyMenu} appBar={MyAppBar}>{children}</Layout>;
  