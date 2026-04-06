import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

// Prevent multiple Prisma instances in development (hot reload)
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

import { Pool } from "pg";

function createPrismaClient() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Drop-in replacement for the old connectToDatabase() calls
export async function connectToDatabase() {
  if (!process.env.DATABASE_URL) {
    if (process.env.NODE_ENV === "development") {
      console.warn("⚠️ DATABASE_URL not configured. Running in database-less mode.");
      return null;
    }
    throw new Error("Please define the DATABASE_URL environment variable");
  }
  return prisma;
}

export const connectDB = connectToDatabase;
export default connectToDatabase;
