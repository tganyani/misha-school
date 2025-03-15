"use client"

import { Show, SimpleShowLayout, TextField, DateField, ReferenceField } from 'react-admin';
import { ZoomUrl } from './lessonEdit';
import { Typography } from '@mui/material';

export const LessonShow = () => (
    <Show>
        <SimpleShowLayout>
             <ReferenceField source="studentId" reference="user">
                      <TextField source="firstName" />
                    </ReferenceField>
                    <ReferenceField source="tutorId" reference="user">
                      <TextField source="firstName" />
                    </ReferenceField>
                    <ReferenceField source="courseId" reference="course">
                      <TextField source="title" />
                    </ReferenceField>
                    <Typography component="div" color="GrayText" variant='body2'>Zoom link</Typography>
                    <ZoomUrl/>
                    <DateField
                      source="startAt"
                      showTime
                      options={{
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }}
                    />
                    <DateField source="createdAt" />
        </SimpleShowLayout>
    </Show>
);