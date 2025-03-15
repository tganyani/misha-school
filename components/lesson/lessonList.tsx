import {
  List,
  Datagrid,
  TextField,
  DateField,
  ReferenceField,
} from "react-admin";

export const LessonList = (props: any) => {
  return (
    <List {...props}>
      <Datagrid>
        {/* <TextField source="student.firstName" /> */}
        <ReferenceField source="studentId" reference="user">
          <TextField source="firstName" />
        </ReferenceField>
        <ReferenceField source="tutorId" reference="user">
          <TextField source="firstName" />
        </ReferenceField>
        <ReferenceField source="courseId" reference="course">
          <TextField source="title" />
        </ReferenceField>
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
        <DateField source="createdAt" />
      </Datagrid>
    </List>
  );
};
