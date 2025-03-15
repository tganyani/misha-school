// import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  TextInput,
  SelectInput,
  SimpleList,
} from "react-admin";
import { useMediaQuery } from "@mui/material";

export const CourseList = (props: any) => {
  const isSmall = useMediaQuery("(max-width:600px)");
  const isbig = useMediaQuery("(max-width:1000px)");
  const choices = [
    { id: 1, name: "primary", key: 1 },
    { id: 2, name: "secondary", key: 2 },
    { id: 3, name: "university", key: 3 },
  ];
  const postFilters = [
    <TextInput key={1} label="search by title" source="title" alwaysOn />,
    <TextInput key={2} label="search by description" source="description" />,
    <SelectInput key={3} source="level" choices={choices} optionValue="name" />,
  ];

  return (
    <List {...props} filters={postFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.title}
          secondaryText={(record) => record.level}
          tertiaryText={
            <TextField
              source="description"
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitLineClamp: 2, // Change this to set number of lines
              }}
            />
          }
        />
      ) : (
        <Datagrid>
          <TextField source="title" />
          <TextField
            source="description"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: 2, // Change this to set number of lines
            }}
          />
          <TextField source="level" />
          {
            !isbig&&<DateField source="createdAt" />
          }
        </Datagrid>
      )}
    </List>
  );
};
