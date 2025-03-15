"use client"
import { SimpleForm, TextInput, required, Create, SelectInput } from "react-admin";

export const CourseCreate = () => {
    const choices = [{id:1,name:"primary"},{id:2,name:"secondary"},{id:3,name:"university"}]
    
 return(
    <Create >
    <SimpleForm>
      <TextInput source="title" validate={required()} />
      <TextInput multiline source="description" validate={required()} />
      <SelectInput source="level" choices={choices} optionValue="name" />
    </SimpleForm>
  </Create>
 )
}