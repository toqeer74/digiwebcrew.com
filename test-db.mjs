import "dotenv/config";
import { PrismaClient } from "./src/generated/prisma/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pkg from "pg";
const { Pool } = pkg;

async function testCreate() {
  console.log("Testing Prisma Create with Adapter...");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });
  
  try {
    console.log("Attempting to create lead...");
    const lead = await prisma.lead.create({
      data: {
        fullName: "Debug Test",
        email: "debug@test.local",
        serviceCategory: "Software Dev",
        serviceInterest: "Debugging",
        status: "NEW",
        leadTier: "COLD",
      }
    });
    console.log("Created successfully:", lead.id);
    
    console.log("Attempting to delete debug lead...");
    await prisma.lead.delete({ where: { id: lead.id } });
    console.log("Deleted successfully.");
  } catch (e) {
    console.error("Prisma Error:", e);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

testCreate();
