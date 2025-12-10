export interface DonationRequest {
  donation_request_id: number;
  title: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  created_on: string;
  createdAgo?: string;

  // FIX: make _count optional so it matches Prisma count behavior
  _count?: {
    ClothingItems: number;
  };
}

export type ClothingItem = {
  clothing_id: number;
  type: string;
  size: string;
  condition: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  front_image_url?: string | null;
  back_image_url?: string | null;
};
