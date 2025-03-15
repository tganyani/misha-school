-- CreateTable
CREATE TABLE "Zoom" (
    "id" SERIAL NOT NULL,
    "meetingId" INTEGER NOT NULL,
    "topic" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "tutorId" INTEGER,
    "startTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Zoom_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Zoom" ADD CONSTRAINT "Zoom_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Zoom" ADD CONSTRAINT "Zoom_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Zoom" ADD CONSTRAINT "Zoom_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
