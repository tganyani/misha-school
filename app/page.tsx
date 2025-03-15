"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.scss";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import type { course,feedback } from "@/db";
import { courses_,feedbacks } from "@/db";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";


export default function Home() {
  const [value, setValue] = useState<number>(2);
  const [courses, setCourses] = useState<course[]>(courses_);
  const [testimonials, setTestimonials] = useState<feedback[]>(feedbacks);
  const handleChageRating = (id: number) => {
    setCourses(
      courses.map((course: course) => {
        if (course.id === id) {
          return { ...course, rating: value };
        }
        return course;
      })
    );
  };
  return (
    <main className={styles.main}>
      <div className={styles.intro}>
        <p className={styles.toptxt}>Welcome to Misha Online School</p>
        <p className={styles.bottomtxt}>
          we offer online classes to different age groups
        </p>
      </div>

      <div className={styles.freeCourses}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            marginBottom: "10px",

          }}
        >
          some of our free courses
        </Typography>
        <div className={styles.courses}>
          {courses.map((course: course) => (
            <Card sx={{ maxWidth: 345 }} key={course.id}  >
              <CardMedia
                sx={{ height: 140 }}
                image={course.image}
                title={course.name}
              />
              <CardContent>
                <Typography gutterBottom variant="body1" component="div">
                  {course.name}
                </Typography>
                <Typography className={styles.description} variant="body2" color="text.secondary">
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
                      {course.tutor}
                    </Typography>
                  </div>
                  <Rating
                    name="simple-controlled"
                    value={course.rating}
                    onChange={async (event, newValue) => {
                      await setValue(Number(newValue));
                      await handleChageRating(course.id);
                    }}
                  />
                </div>
              </CardContent>
              <CardActions>
              <Chip
                // onClick={() => router.push(`/primary/${course.id}`)}
                sx={{
                  backgroundColor: "limegreen",
                  color: "white",
                  flexDirection: "row-reverse",
                  fontSize:"16px",
                  paddingRight: "10px",
                }}
                label="continue to course"
                icon={
                  <ArrowRightAltIcon
                    sx={{ color:"white","&&": { color: "white" } }}
                  ></ArrowRightAltIcon>
                }
              />
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
      <div className={styles.studentFeedback}>
        <div className={styles.header}>
          <Typography gutterBottom variant="h6" component="div">
            what students say about us ?
          </Typography>
        </div>
        <div className={styles.students}>
          {testimonials.map((testimonial: feedback) => (
            <Paper className={styles.card} key={testimonial.id}>
              <div className={styles.cardImage}>
                <img
                  src={testimonial.image}
                  alt="stud-image"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "60px",
                    float: "left",
                  }}
                />
                <Typography
                  variant="body2"
                  component="div"
                  color="text.secondary"
                  sx={{fontStyle:"italic",fontWeight:"bold"}}
                >
                  {testimonial.message}
                </Typography>
              </div>
              <div className={styles.cardFooter}>
                <Typography variant="body2" component="div">
                  {testimonial.name}
                </Typography>
              </div>
            </Paper>
          ))}
        </div>
      </div>
    </main>
  );
}
