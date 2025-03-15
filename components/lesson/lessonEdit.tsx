"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  SimpleForm,
  Edit,
  TextInput,
  required,
  SelectInput,
  DateTimeInput,
  DateInput,
  useRecordContext,
  useRefresh,
  UrlField,
  SearchInput,AutocompleteInput
} from "react-admin";
import CircularProgress from "@mui/material/CircularProgress";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useWatch } from "react-hook-form";
import dayjs from "dayjs";

interface choice {
  id: number;
  name: string;
}

const ZoomButtons = () => {
  const refresh = useRefresh();
  const record = useRecordContext();
  const [loading, setLoading] = useState<boolean | any>(false);
  const startAt = useWatch({ name: "startAt" });
  const createLink = async () => {
    setLoading(true);
    await axios.post("/api/zoom", {
      topic: `${record?.student?.firstName}${record?.course?.title}`,
      lessonId: record?.id,
      tutorId: record?.tutorId,
      studentId: record?.studentId,
      startAt: record?.startAt,
    });
    refresh();
    setLoading(false);
  };

  const updateLink = async () => {
    setLoading(true);
    await axios.patch(`/api/zoom/${record?.zoom?.meetingId}`, {
      startAt,
      lessonId: record?.id,
    });
    refresh();
    setLoading(false);
  };

  const deleteLink = async () => {
    setLoading(true);
    await axios.delete(`/api/zoom/${record?.zoom?.meetingId}`);
    refresh();
    setLoading(false);
  };
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row wrap",
        columnGap: "10px",
        rowGap: "10px",
        marginTop: "10px",
        marginBottom: "10px",
      }}
    >
      {!record?.zoom?.url && (
        <Button
          sx={{ textTransform: "lowercase", minWidth: "120px" }}
          onClick={createLink}
        >
          {loading ? <CircularProgress size={16} /> : "creat zoom link"}
        </Button>
      )}
      {!dayjs(startAt).isSame(dayjs(record?.startAt)) && record?.zoom?.url && (
        <Button
          sx={{
            textTransform: "lowercase",
            minWidth: "120px",
          }}
          onClick={updateLink}
        >
          {loading ? <CircularProgress size={16} /> : "update link"}
        </Button>
      )}

      {record?.zoom?.url && dayjs(startAt).isSame(dayjs(record?.startAt)) && (
        <Button
          sx={{
            textTransform: "lowercase",
            minWidth: "120px",
          }}
          color="error"
          onClick={deleteLink}
        >
          {loading ? (
            <CircularProgress color="error" size={16} />
          ) : (
            "delete link"
          )}
        </Button>
      )}
    </div>
  );
};

export const ZoomUrl = () => {
  const record = useRecordContext();
  const [copied, setCopied] = useState<Boolean>(false);
  return (
    record?.zoom?.url && (
      <Stack direction="row" spacing={2}>
        <UrlField source="zoom.url" />
        <ContentCopyIcon
          sx={{ fontSize: "18px" }}
          onClick={() =>
            navigator.clipboard.writeText(record?.zoom?.url).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 3000);
            })
          }
        />
        {copied && (
          <Typography variant="body2" component="div">
            copied url
          </Typography>
        )}
      </Stack>
    )
  );
};

export const LessonEdit = () => {
  const [serchTerm, setSearchTerm] = useState<string>("");
  const [choices, setChoices] = useState<choice[]>([{id:1222,name:"Tgb"}]);
  // const choices = [
  //   { id: 1, name: "primary" },
  //   { id: 2, name: "secondary" },
  //   { id: 3, name: "university" },
  // ];
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios
        .post("http://localhost:3000/api/user/username", {
          username: serchTerm,
        })
        .then((res) => res.data)
        .catch((err) => console.error(err));

      setChoices(
        res?.map((user: any) => ({ id: user.id, name: user.firstName }))
      );
    };
    fetchUsers();
  },[]);

  return (
    <Edit>
      <SimpleForm>
        <TextInput disabled label="Id" source="id" />
        <TextInput disabled label="course" source="course.title" />
        <AutocompleteInput  label="tutor" size="small" source="tutor.firstName" openText="name" optionValue="id"  choices={choices}/>
        <DateTimeInput source="startAt" validate={required()} />
        <ZoomUrl />
        <ZoomButtons />
        <DateInput disabled source="createdAt" />
      </SimpleForm>
    </Edit>
  );
};
