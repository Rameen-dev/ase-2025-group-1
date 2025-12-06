/*
  Warnings:

  - The `status` column on the `CharityApplications` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "CharityApplications" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "public"."CharityApplicationStatus";

-- CreateTable
CREATE TABLE "Donations" (
    "donation_id" SERIAL NOT NULL,
    "donation_request_id" INTEGER NOT NULL,
    "created_by" INTEGER NOT NULL,
    "accepted_by" INTEGER NOT NULL,
    "accepted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Donations_pkey" PRIMARY KEY ("donation_id")
);

-- CreateTable
CREATE TABLE "DonationRequest" (
    "donation_request_id" SERIAL NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "answered_by" INTEGER,
    "created_by" INTEGER NOT NULL,

    CONSTRAINT "DonationRequest_pkey" PRIMARY KEY ("donation_request_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Donations_donation_request_id_key" ON "Donations"("donation_request_id");

-- CreateIndex
CREATE INDEX "CharityApplications_status_created_on_idx" ON "CharityApplications"("status", "created_on");

-- AddForeignKey
ALTER TABLE "Donations" ADD CONSTRAINT "Donations_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donations" ADD CONSTRAINT "Donations_accepted_by_fkey" FOREIGN KEY ("accepted_by") REFERENCES "Charities"("charity_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donations" ADD CONSTRAINT "Donations_donation_request_id_fkey" FOREIGN KEY ("donation_request_id") REFERENCES "DonationRequest"("donation_request_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationRequest" ADD CONSTRAINT "DonationRequest_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationRequest" ADD CONSTRAINT "DonationRequest_answered_by_fkey" FOREIGN KEY ("answered_by") REFERENCES "Charities"("charity_id") ON DELETE SET NULL ON UPDATE CASCADE;
