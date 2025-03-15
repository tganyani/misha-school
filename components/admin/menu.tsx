
import { Menu } from "react-admin";

export const MyMenu = () => {
  return (
    <Menu>
      <Menu.DashboardItem />
      <Menu.ResourceItem name="user" />
      <Menu.ResourceItem name="lesson" />
      <Menu.ResourceItem name="course" />
    </Menu>
  );
};
