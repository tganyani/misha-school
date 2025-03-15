
// import React from 'react';
import { List, Datagrid, TextField, DateField ,TextInput,SelectInput} from 'react-admin';

export const CourseList = (props:any) => {
  const choices = [{id:1,name:"primary"},{id:2,name:"secondary"},{id:3,name:"university"}]
  const postFilters = [
    <TextInput label="search by title" source="title"  alwaysOn />,
    <TextInput label="search by description" source="description" defaultValue="course description" />,
    <SelectInput source="level" choices={choices} optionValue="name" />
  ];
  
  return (
    <List {...props} filters={postFilters}>
      <Datagrid>
        <TextField source="title" />
        <TextField source="description" />
        <TextField source="level" />
        <DateField source="createdAt" />
      </Datagrid>
    </List>
  )

}


