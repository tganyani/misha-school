"use client"
import { SimpleForm, Edit, TextInput, required ,SelectInput} from "react-admin";

export const CourseEdit = () => {
  const choices = [{id:1,name:"primary"},{id:2,name:"secondary"},{id:3,name:"university"}]
 return(
    <Edit >
    <SimpleForm>
      <TextInput disabled label="Id" source="id" />
      <TextInput source="title" validate={required()} />
      <TextInput multiline source="description" validate={required()} />
      <SelectInput source="level" choices={choices} optionValue="name" />
    </SimpleForm>
  </Edit>
 )
}
