/*
  Warnings:

  - A unique constraint covering the columns `[lessonId]` on the table `Zoom` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Zoom_lessonId_key" ON "Zoom"("lessonId");
