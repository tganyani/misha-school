import {
  EditBase,
  SelectInput,
  SimpleForm,
  TextInput,
  Title,
} from "react-admin";
import { Card, CardContent, Container } from "@mui/material";

export const UserEdit = () => (
  <EditBase>
    <Container>
      <Title title="Edit User" />
      <Card>
        <CardContent>
          <SimpleForm>
            <TextInput disabled label="Id" source="id" />
            <TextInput disabled label="First Name" source="firstName" />
            <TextInput disabled label="Last Name" source="lastNamer" />
            <TextInput disabled label="Email" source="email" />
            <SelectInput
              source="Role"
              optionValue="name"
              choices={[
                { id: 1, name: "student" },
                { id: 2, name: "tutor" },
                { id: 3, name: "admin" },
              ]}
            />
          </SimpleForm>
        </CardContent>
      </Card>
    </Container>
  </EditBase>
);
