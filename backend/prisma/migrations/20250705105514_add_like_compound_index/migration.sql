/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[imageId,userId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_imageId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_imageId_fkey";

-- DropIndex
DROP INDEX "Comment_userId_imageId_key";

-- DropIndex
DROP INDEX "Like_userId_imageId_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT;

-- DropTable
DROP TABLE "Image";

-- CreateIndex
CREATE UNIQUE INDEX "Like_imageId_userId_key" ON "Like"("imageId", "userId");
