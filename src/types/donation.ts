export interface DonationRequest {
  donation_request_id: number;
  title: string;
  status: "PENDING" | "APPROVED" | "REJECTED";

  // FIX: make _count optional so it matches Prisma count behavior
  _count?: {
    clothing_items: number;
  };
}
