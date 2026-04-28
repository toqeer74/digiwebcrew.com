import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

// Prevent multiple Prisma instances in development (hot reload)
const globalForPrisma = globalThis as unknown as { 
  prisma: PrismaClient;
  pool: pg.Pool;
};

const connectionString = process.env.DATABASE_URL;

// Use a singleton for the pool as well to prevent "too many clients" errors during HMR
const pool = globalForPrisma.pool ?? new pg.Pool({ connectionString });
if (process.env.NODE_ENV !== "production") globalForPrisma.pool = pool;

const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter });

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
