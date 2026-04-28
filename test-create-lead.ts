import "dotenv/config";
import { createLead } from "./src/lib/actions/lead-actions";

async function main() {
  try {
    const res = await createLead({
      fullName: "asdf",
      email: "a@gmail.com",
      company: "asdf",
      budgetRange: "$5k - $10k",
      serviceCategory: "Software Dev",
      serviceInterest: "Custom ERP",
      message: "asdf"
    });
    console.log("Success:", res);
  } catch (e) {
    console.error("Error:", e);
  }
}

main();
