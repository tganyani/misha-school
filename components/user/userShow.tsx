import { Show, SimpleShowLayout, TextField, DateField, EmailField } from 'react-admin';

export const UserShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="firstName" />
            <TextField source="lastName" />
            <EmailField source='email' />
            <TextField source="Role" />
            <DateField label="Date Registered" source="createdAt" />
        </SimpleShowLayout>
    </Show>
);