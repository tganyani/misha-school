import styles from "./page.module.scss";
import Typography from "@mui/material/Typography";

import prisma from "@/lib/prisma";
import TutorCard from "@/components/tutorCard";
import { Stack } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import AllCommentsCard from "@/components/allCommentsCard";

export default async function Home() {
  const tutors = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      image: true,
      subjects: true,
      imagePublicId: true,
      about: true,
      freeTrials: {
        select: {
          studEmail: true,
        },
      },
      availability: {
        take: 1,
        where: {
          time: {
            gte: new Date(),
          },
        },
        select: {
          id: true,
        },
      },
    },
  });

  const comments = await prisma.comment.findMany({
    select: {
      id: true,
      text: true,
      updatedAt: true,
      student: {
        select: {
          lastName: true,
          firstName: true,
          image: true,
          imagePublicId: true,
        },
      },
      tutor: {
        select: {
          id: true,
          lastName: true,
          firstName: true,
          image: true,
          imagePublicId: true,
        },
      },
    },
  });

  return (
    <main className={styles.main}>
      <div className={styles.intro}>
        <p className={styles.toptxt}>Welcome to Misha Online School</p>
        <p className={styles.bottomtxt}>
          we offer online classes to different age groups
        </p>
      </div>

      <div className={styles.freeCourses}>
        <Stack
          sx={{
            display: "flex",
            flexFlow: "row nowrap",
            justifyContent: "center",
            alignItems: "center",
            columnGap: "8px",
          }}
        >
          <FormatQuoteIcon sx={{ color: "limegreen" }} />
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              textAlign: "center",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            some of our best tutors
          </Typography>
        </Stack>

        <div className={styles.courses}>
          {tutors.map((tutor: any) => (
            <TutorCard user={tutor} key={tutor.id} />
          ))}
        </div>
      </div>
      {/* comment from students */}
      <div>
        <Stack
          sx={{
            display: "flex",
            flexFlow: "row nowrap",
            justifyContent: "center",
            alignItems: "center",
            columnGap: "8px",
          }}
        >
          <FormatQuoteIcon sx={{ color: "limegreen" }} />
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              textAlign: "center",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            Here is what students say about our tutors
          </Typography>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            flexFlow: "row nowrap",
            gap: "8px",
            overflowX: "auto",
            maxWidth: "100vw",
          }}
        >
          {comments.map((comment) => (
            <AllCommentsCard key={comment.id} comment={comment} />
          ))}
        </Stack>
      </div>
    </main>
  );
}
