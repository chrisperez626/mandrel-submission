-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "slack_id" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_slack_id_key" ON "User"("slack_id");

-- CreateIndex
CREATE INDEX "User_slack_id_idx" ON "User"("slack_id");
