/*
  Warnings:

  - A unique constraint covering the columns `[meetingId]` on the table `Zoom` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Zoom_meetingId_key" ON "Zoom"("meetingId");
