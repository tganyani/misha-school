

import {
  Layout,
} from "react-admin";
import { MyMenu } from "./menu";
import { MyAppBar } from "./appBar";

export const MyLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => <Layout menu={MyMenu} appBar={MyAppBar}>{children}</Layout>;
  