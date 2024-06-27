-- DropIndex
DROP INDEX "User_slack_id_idx";

-- CreateIndex
CREATE INDEX "User_name_idx" ON "User"("name");
