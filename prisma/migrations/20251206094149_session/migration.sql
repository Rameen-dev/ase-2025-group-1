-- CreateEnum
CREATE TYPE "SessionActorType" AS ENUM ('DONOR', 'CHARITY', 'ADMIN');

-- CreateTable
CREATE TABLE "Session" (
    "session_id" SERIAL NOT NULL,
    "session_token" TEXT NOT NULL,
    "actor_type" "SessionActorType" NOT NULL,
    "user_id" INTEGER,
    "charity_id" INTEGER,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_on" TIMESTAMP(3) NOT NULL,
    "revoked_on" TIMESTAMP(3),

    CONSTRAINT "Session_pkey" PRIMARY KEY ("session_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_session_token_key" ON "Session"("session_token");

-- CreateIndex
CREATE INDEX "Session_user_id_idx" ON "Session"("user_id");

-- CreateIndex
CREATE INDEX "Session_charity_id_idx" ON "Session"("charity_id");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_charity_id_fkey" FOREIGN KEY ("charity_id") REFERENCES "Charities"("charity_id") ON DELETE SET NULL ON UPDATE CASCADE;
