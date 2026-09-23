-- CreateEnum
CREATE TYPE "OAuthProvider" AS ENUM ('github');

-- Drop password auth entirely: login is now GitHub OAuth only, with the
-- users table itself acting as the email allow-list.
ALTER TABLE "users" DROP COLUMN "passwordHash";

-- AddColumn
ALTER TABLE "users" ADD COLUMN "provider" "OAuthProvider";
