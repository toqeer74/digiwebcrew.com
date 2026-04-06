import { connectToDatabase } from "./db";

/**
 * Database wrapper — same interface as before, now uses Prisma/PostgreSQL
 */
export class DatabaseWrapper {
  static async withConnection<T>(
    operation: () => Promise<T>,
    fallback: T
  ): Promise<T> {
    try {
      const db = await connectToDatabase();
      if (!db) {
        console.warn("⚠️ Database not available, using fallback data");
        return fallback;
      }
      return await operation();
    } catch (error) {
      console.error("❌ Database operation failed:", error);
      return fallback;
    }
  }
}
