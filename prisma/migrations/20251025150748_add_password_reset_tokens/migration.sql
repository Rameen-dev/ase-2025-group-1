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

-- CreateIndex
CREATE INDEX "PasswordResetTokens_user_id_created_on_idx" ON "PasswordResetTokens"("user_id", "created_on");

-- AddForeignKey
ALTER TABLE "PasswordResetTokens" ADD CONSTRAINT "PasswordResetTokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
