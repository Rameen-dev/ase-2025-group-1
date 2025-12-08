/*
  Warnings:

  - You are about to drop the column `user_id` on the `Charities` table. All the data in the column will be lost.
  - Made the column `phone` on table `Charities` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Charities" DROP CONSTRAINT "Charities_user_id_fkey";

-- DropIndex
DROP INDEX "public"."Charities_user_id_key";

-- AlterTable
ALTER TABLE "Charities" DROP COLUMN "user_id",
ADD COLUMN     "password_hash" TEXT,
ALTER COLUMN "phone" SET NOT NULL;
