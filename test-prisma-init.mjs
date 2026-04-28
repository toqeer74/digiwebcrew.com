import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

console.log("DATABASE_URL from env:", process.env.DATABASE_URL ? "Exists (hidden)" : "MISSING");

try {
  const prisma = new PrismaClient();
  console.log("PrismaClient initialized successfully (as object)");
  // Attempt a simple query to see if it actually connects
  // await prisma.$connect();
  // console.log("PrismaClient connected");
} catch (error) {
  console.error("Error initializing PrismaClient:");
  console.error(error);
}
