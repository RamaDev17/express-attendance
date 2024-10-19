-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('super_admin', 'employee');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'employee';
