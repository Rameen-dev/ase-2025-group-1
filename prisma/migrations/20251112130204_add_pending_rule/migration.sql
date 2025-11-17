-- Allow only ONE PENDING application per email
CREATE UNIQUE INDEX IF NOT EXISTS "CharityApplications_unique_pending_email"
  ON "CharityApplications"(LOWER("contact_email"))
  WHERE "status" = 'PENDING';
