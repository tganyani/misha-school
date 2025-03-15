import { List, Datagrid, TextField, DateField ,TextInput,SelectInput} from 'react-admin';

export const UserList = (props:any) => {
//   const choices = [{id:1,name:"primary"},{id:2,name:"secondary"},{id:3,name:"university"}]
//   const postFilters = [
//     <TextInput label="search by title" source="title"  alwaysOn />,
//     <TextInput label="search by description" source="description" defaultValue="course description" />,
//     <SelectInput source="level" choices={choices} optionValue="name" />
//   ];
  
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="firstName" />
        <TextField source="lastName" />
        <TextField source="email" />
        <TextField source="Role" />
        <DateField source="createdAt" />
      </Datagrid>
    </List>
  )

}
