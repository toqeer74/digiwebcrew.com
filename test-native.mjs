import "dotenv/config";
import { PrismaClient } from "./src/generated/prisma/index.js";

async function testNative() {
  console.log("Testing Native Prisma (with {})...");
  const prisma = new PrismaClient({}); // Explicitly passing options
  
  try {
    console.log("Attempting to find leads...");
    const leads = await prisma.lead.findMany({ take: 1 });
    console.log("Find Success:", leads.length);

    console.log("Attempting to create lead...");
    const lead = await prisma.lead.create({
      data: {
        fullName: "Native Test",
        email: "native@test.local",
        serviceCategory: "Software Dev",
        serviceInterest: "Native Prisma",
        status: "NEW",
        leadTier: "COLD",
      }
    });
    console.log("Create Success:", lead.id);
    
    await prisma.lead.delete({ where: { id: lead.id } });
    console.log("Cleanup Success.");
  } catch (e) {
    console.error("Native Prisma Error:", e);
  } finally {
    await prisma.$disconnect();
  }
}

testNative();
