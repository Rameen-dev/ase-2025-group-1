import { PrismaClient } from "../generated/prisma"; // matches your prisma schema 'output' path

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query", "error", "warn"], // helpful logs in your console
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
