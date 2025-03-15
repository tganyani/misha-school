
// import React from 'react';
import { List, Datagrid, TextField, DateField ,TextInput,SelectInput} from 'react-admin';

export const CourseList = (props:any) => {
  const choices = [{id:1,name:"primary",key:1},{id:2,name:"secondary",key:2},{id:3,name:"university",key:3}]
  const postFilters = [
    <TextInput key={1} label="search by title" source="title"  alwaysOn />,
    <TextInput key={2} label="search by description" source="description" defaultValue="course description" />,
    <SelectInput key={3} source="level" choices={choices} optionValue="name" />
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


