import "dotenv/config";
import { PrismaClient } from "@prisma/client";

async function verify() {
  console.log("Verifying Native Prisma Fix with explicit options...");
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  });
  
  try {
    console.log("Attempting create...");
    const lead = await prisma.lead.create({
      data: {
        fullName: "Fix Test",
        email: "fix@test.local",
        serviceCategory: "Software Dev",
        serviceInterest: "Native Engine",
        status: "NEW",
        leadTier: "WARM",
      }
    });
    console.log("Test Success! Lead ID:", lead.id);
    
    await prisma.lead.delete({ where: { id: lead.id } });
    console.log("Cleanup Success.");
  } catch (e) {
    console.error("Test Failed:", e);
  } finally {
    await prisma.$disconnect();
  }
}

verify();
