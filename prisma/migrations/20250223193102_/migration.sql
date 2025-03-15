/*
  Warnings:

  - You are about to drop the column `courseTd` on the `Lesson` table. All the data in the column will be lost.
  - Added the required column `courseId` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "courseTd",
ADD COLUMN     "courseId" INTEGER NOT NULL;
