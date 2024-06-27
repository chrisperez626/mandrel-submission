-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slack_id" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE INDEX "User_slack_id_idx" ON "User"("slack_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
