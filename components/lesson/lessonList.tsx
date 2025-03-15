import {
  List,
  Datagrid,
  TextField,
  DateField,
  TextInput,
  SimpleList,
} from "react-admin";
import { Stack, useMediaQuery } from "@mui/material";

export const LessonList = (props: any) => {
  const isSmall = useMediaQuery("(max-width:600px)");
  const isbig = useMediaQuery("(max-width:1000px)");
  const postFilters = [
    <TextInput
      key={1}
      label="search student name"
      source="student.firstName"
      alwaysOn
    />,
    <TextInput key={2} label="search  course title" source="course.title" />,
  ];
  return (
    <List {...props} filters={postFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => `${record.course.title}`}
          tertiaryText={
            <Stack direction="column">
              {" "}
              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  fontSize: "14px",
                  color: "GrayText",
                }}
              >
                <span>student</span> <TextField source="student.firstName" />
              </Stack>
              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  fontSize: "14px",
                  color: "GrayText",
                }}
                spacing={5}
              >
                <span>tutor</span>{" "}
                <TextField label="tutor" source="tutor.firstName" />
              </Stack>
            </Stack>
          }
          secondaryText={
            <Stack>
              {" "}
              <DateField
                source="startAt"
                showTime
                options={{
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }}
              />
            </Stack>
          }
        />
      ) : (
        <Datagrid>
          <TextField label="student" source="student.firstName" />
          <TextField label="tutor" source="tutor.firstName" />
          <TextField label="course" source="course.title" />
          <DateField
            source="startAt"
            showTime
            options={{
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }}
          />
          {
          
          !isbig&&<DateField source="createdAt" />
          }
        </Datagrid>
      )}
    </List>
  );
};
