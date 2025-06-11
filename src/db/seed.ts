import { mockArticles } from "@/data/mocks";

import db from ".";
import { articles } from "./schema";

async function seed() {
  try {
    await db.insert(articles).values(mockArticles);
    console.log("✅ Seed completed successfully!");
  } catch (error) {
    console.error("❌ Seed failed:", error);
  } finally {
    process.exit();
  }
}

seed();
