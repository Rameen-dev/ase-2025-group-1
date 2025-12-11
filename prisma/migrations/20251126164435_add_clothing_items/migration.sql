-- CreateTable
CREATE TABLE "ClothingItems" (
    "clothing_id" SERIAL NOT NULL,
    "donation_request_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "donor_id" INTEGER NOT NULL,
    "donation_id" INTEGER,
    "owned_by" INTEGER,
    "front_image_url" TEXT NOT NULL,
    "back_image_url" TEXT NOT NULL,

    CONSTRAINT "ClothingItems_pkey" PRIMARY KEY ("clothing_id")
);

-- AddForeignKey
ALTER TABLE "ClothingItems" ADD CONSTRAINT "ClothingItems_donation_request_id_fkey" FOREIGN KEY ("donation_request_id") REFERENCES "DonationRequest"("donation_request_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClothingItems" ADD CONSTRAINT "ClothingItems_donor_id_fkey" FOREIGN KEY ("donor_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClothingItems" ADD CONSTRAINT "ClothingItems_owned_by_fkey" FOREIGN KEY ("owned_by") REFERENCES "Charities"("charity_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClothingItems" ADD CONSTRAINT "ClothingItems_donation_id_fkey" FOREIGN KEY ("donation_id") REFERENCES "Donations"("donation_id") ON DELETE SET NULL ON UPDATE CASCADE;
