import { List, Datagrid, TextField, DateField ,TextInput,SelectInput, SimpleList,} from 'react-admin';

import { useMediaQuery } from "@mui/material";


export const UserList = (props:any) => {
  const isSmall = useMediaQuery("(max-width:600px)");
  const isbig = useMediaQuery("(max-width:1000px)");
  const choices = [{id:1,name:"student"},{id:2,name:"tutor"},{id:3,name:"admin"}]
  const postFilters = [
    <TextInput label="search by first name" source="firstName"  alwaysOn />,
    <TextInput label="search by email" source="email" />,
    <SelectInput source="Role" choices={choices} optionValue="name" />
  ];
  
  return (
    <List {...props} filters={postFilters}>
      {isSmall ? (
              <SimpleList
                primaryText={(record) => `${record.firstName}   ${record.lastName}`}
                secondaryText={(record) => record.email}
                tertiaryText={(record) => record.Role}
              />
            ) : (
              <Datagrid>
              <TextField source="firstName" />
              <TextField source="lastName" />
              <TextField source="email" />
              <TextField source="Role" />
              {!isbig&&<DateField source="createdAt" />}
            </Datagrid>
            )}
     
    </List>
  )

}
