/*
  Warnings:

  - A unique constraint covering the columns `[slack_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_name_idx";

-- CreateIndex
CREATE UNIQUE INDEX "User_slack_id_key" ON "User"("slack_id");

-- CreateIndex
CREATE INDEX "User_slack_id_idx" ON "User"("slack_id");
