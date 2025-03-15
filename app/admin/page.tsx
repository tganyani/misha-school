"use client";
import { Admin, Resource } from "react-admin";
import dataProvider from "@/lib/dataProvider";
import { CourseList } from "@/components/course/courseList";
import { CourseEdit } from "@/components/course/courseEdit";
import { CourseCreate } from "@/components/course/courseCreate";
import { CourseShow } from "@/components/course/courseShow";
import { UserList } from "@/components/user/userList";
import { UserShow } from "@/components/user/userShow";
import { UserEdit } from "@/components/user/userEdit";
import { LessonList } from "@/components/lesson/lessonList";
import PeopleIcon from "@mui/icons-material/People";
import ClassIcon from "@mui/icons-material/Class";
import SchoolIcon from "@mui/icons-material/School";

import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { MyLayout } from "@/components/admin/layout";
import { LessonEdit } from "@/components/lesson/lessonEdit";
import { LessonShow } from "@/components/lesson/lessonShow";

const AdminPanel = () => {
  const theme = useAppSelector((state: RootState) => state.theme.value);
  return (
    <Admin
      dataProvider={dataProvider}
      layout={MyLayout}
      theme={theme}
      darkTheme={{ palette: { mode: "dark" } }}
    >
      <Resource
        name="course"
        icon={SchoolIcon}
        list={CourseList}
        edit={CourseEdit}
        create={CourseCreate}
        show={CourseShow}
      />
      <Resource
        name="user"
        icon={PeopleIcon}
        list={UserList}
        edit={UserEdit}
        show={UserShow}
      />
      <Resource
        name="lesson"
        icon={ClassIcon}
        list={LessonList}
        edit={LessonEdit}
        show={LessonShow}
      />
    </Admin>
  );
};

export default AdminPanel;
