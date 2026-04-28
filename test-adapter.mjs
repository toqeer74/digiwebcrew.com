import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

console.log("DATABASE_URL from env exists:", !!process.env.DATABASE_URL);

async function test() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  
  try {
    const prisma = new PrismaClient({ adapter });
    console.log("PrismaClient with PG adapter initialized successfully");
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log("Query result:", result);
    await pool.end();
  } catch (error) {
    console.error("Error initializing PrismaClient with PG adapter:");
    console.error(error);
    await pool.end();
  }
}

test();
