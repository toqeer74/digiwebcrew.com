import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

console.log("DATABASE_URL from env exists:", !!process.env.DATABASE_URL);

try {
  const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL
  });
  console.log("PrismaClient with explicit datasourceUrl initialized successfully");
} catch (error) {
  console.error("Error initializing PrismaClient with explicit datasourceUrl:");
  console.error(error);
}
