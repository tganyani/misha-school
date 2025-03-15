"use client"

import { Show, SimpleShowLayout, TextField, DateField, RichTextField } from 'react-admin';

export const CourseShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="title" />
            <TextField source="level" />
            <RichTextField source="description" />
            <DateField label="Publication date" source="createdAt" />
        </SimpleShowLayout>
    </Show>
);