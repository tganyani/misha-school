"use client";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import styles from "@/styles/primary.module.scss";
// import type { course } from "@/db";


import { useRouter } from "next/navigation";
import useSWR from "swr";
import CircularProgress from "@mui/material/CircularProgress";

interface course{
  id: number;
    title: string;
    description: string;
    image: string;
    tutor: string;
    rating: number;
    level:string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Primary = () => {
  const router = useRouter();
  const { data, error } = useSWR("/api/course/get", fetcher);
  if (error) <div>Failed to load</div>;
  if (!data)
    return (
      <div style={{width:'100vw', display: "flex", justifyContent: "center",flexDirection:"row",alignItems:"center" }}>
        <CircularProgress size={20} />
      </div>
    );
   
  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <input className={styles.input} placeholder="seach for course ..." />
      </div>
      <div className={styles.courses}>
        {data.map((course: course) => (
          <Card
            sx={{ maxWidth: 345 }}
            elevation={1}
            key={course.id}
            className={styles.card}
          >
            <CardMedia
              sx={{ height: 140 }}
              image={course.image}
              title={course.title}
            />
            <CardContent>
              <Typography gutterBottom variant="body1" component="div">
                {course.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className={styles.description}
              >
                {course.description}
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexFlow: "row nowrap",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Typography variant="body1">tutor</Typography>
                  <Typography
                    variant="body2"
                    component="div"
                    color="text.secondary"
                  >
                   Misha Jose
                  </Typography>
                </div>
                {/* <Rating
                    name="simple-controlled"
                    value={course.rating}
                    onChange={async (event, newValue) => {
                      await setValue(Number(newValue));
                      await handleChageRating(course.id);
                    }}
                  /> */}
              </div>
            </CardContent>
            <CardActions>
              <Chip
                onClick={() => router.push(`/primary/${course.id}`)}
                sx={{
                  backgroundColor: "limegreen",
                  color: "white",
                  flexDirection: "row-reverse",
                  paddingRight: "10px",
                }}
                label="continue to course"
                icon={
                  <ArrowRightAltIcon
                    sx={{ "&&": { color: "white" } }}
                  ></ArrowRightAltIcon>
                }
              />
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Primary;
