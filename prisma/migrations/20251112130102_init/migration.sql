-- CreateEnum
CREATE TYPE "CharityApplicationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "is_verified" BOOLEAN NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "EmailVerificationTokens" (
    "ev_token_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "expires_on" TIMESTAMP(3) NOT NULL,
    "consumed_on" TIMESTAMP(3),
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailVerificationTokens_pkey" PRIMARY KEY ("ev_token_id")
);

-- CreateTable
CREATE TABLE "PasswordResetTokens" (
    "pr_token_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "expires_on" TIMESTAMP(3) NOT NULL,
    "consumed_on" TIMESTAMP(3),
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordResetTokens_pkey" PRIMARY KEY ("pr_token_id")
);

-- CreateTable
CREATE TABLE "Charities" (
    "charity_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Charities_pkey" PRIMARY KEY ("charity_id")
);

-- CreateTable
CREATE TABLE "CharityApplications" (
    "application_id" SERIAL NOT NULL,
    "org_name" TEXT NOT NULL,
    "contact_name" TEXT NOT NULL,
    "contact_email" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "org_address" TEXT NOT NULL,
    "charity_number" TEXT,
    "status" "CharityApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "reviewed_on" TIMESTAMP(3),
    "reviewed_by" INTEGER,
    "approved_on" TIMESTAMP(3),
    "approved_by" INTEGER,
    "charity_id" INTEGER,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CharityApplications_pkey" PRIMARY KEY ("application_id")
);

-- CreateTable
CREATE TABLE "CharitySignupTokens" (
    "invite_id" SERIAL NOT NULL,
    "charity_id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires_on" TIMESTAMP(3) NOT NULL,
    "consumed_on" TIMESTAMP(3),
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,

    CONSTRAINT "CharitySignupTokens_pkey" PRIMARY KEY ("invite_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EmailVerificationTokens_token_key" ON "EmailVerificationTokens"("token");

-- CreateIndex
CREATE INDEX "EmailVerificationTokens_user_id_created_on_idx" ON "EmailVerificationTokens"("user_id", "created_on");

-- CreateIndex
CREATE INDEX "PasswordResetTokens_user_id_created_on_idx" ON "PasswordResetTokens"("user_id", "created_on");

-- CreateIndex
CREATE UNIQUE INDEX "Charities_email_key" ON "Charities"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Charities_user_id_key" ON "Charities"("user_id");

-- CreateIndex
CREATE INDEX "Charities_name_idx" ON "Charities"("name");

-- CreateIndex
CREATE INDEX "Charities_email_idx" ON "Charities"("email");

-- CreateIndex
CREATE INDEX "CharityApplications_status_created_on_idx" ON "CharityApplications"("status", "created_on");

-- CreateIndex
CREATE INDEX "CharityApplications_contact_email_idx" ON "CharityApplications"("contact_email");

-- CreateIndex
CREATE UNIQUE INDEX "CharitySignupTokens_token_key" ON "CharitySignupTokens"("token");

-- CreateIndex
CREATE INDEX "CharitySignupTokens_charity_id_created_on_idx" ON "CharitySignupTokens"("charity_id", "created_on");

-- CreateIndex
CREATE INDEX "CharitySignupTokens_email_idx" ON "CharitySignupTokens"("email");

-- AddForeignKey
ALTER TABLE "EmailVerificationTokens" ADD CONSTRAINT "EmailVerificationTokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetTokens" ADD CONSTRAINT "PasswordResetTokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charities" ADD CONSTRAINT "Charities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharityApplications" ADD CONSTRAINT "CharityApplications_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharityApplications" ADD CONSTRAINT "CharityApplications_reviewed_by_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharityApplications" ADD CONSTRAINT "CharityApplications_charity_id_fkey" FOREIGN KEY ("charity_id") REFERENCES "Charities"("charity_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharitySignupTokens" ADD CONSTRAINT "CharitySignupTokens_charity_id_fkey" FOREIGN KEY ("charity_id") REFERENCES "Charities"("charity_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharitySignupTokens" ADD CONSTRAINT "CharitySignupTokens_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
