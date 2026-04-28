import "dotenv/config";
import { PrismaClient } from "./src/generated/prisma/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

async function main() {
  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    const lead = await prisma.lead.create({
      data: {
        fullName: "Test",
        email: "test@example.com",
        serviceCategory: "Design",
        serviceInterest: "Web Design",
        status: "NEW", // The type for this in Prisma schema is LeadStatus enum
        events: {
          create: [{ type: "test" }]
        }
      }
    });

    console.log("Success:", lead);
  } catch (e) {
    console.error("Error:", e);
  }
}

main();
