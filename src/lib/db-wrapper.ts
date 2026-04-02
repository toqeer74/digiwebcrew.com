import { connectToDatabase } from "./db";

/**
 * Database wrapper that gracefully handles connection failures
 * Returns mock data when database is not available (development mode)
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

  static async countDocuments(model: any, filter = {}): Promise<number> {
    return this.withConnection(
      () => model.countDocuments(filter),
      0
    );
  }

  static async find(model: any, filter = {}, options = {}): Promise<any[]> {
    return this.withConnection(
      () => model.find(filter, null, options),
      []
    );
  }

  static async findOne(model: any, filter = {}, options = {}): Promise<any> {
    return this.withConnection(
      () => model.findOne(filter, null, options),
      null
    );
  }

  static async create(model: any, data: any): Promise<any> {
    return this.withConnection(
      () => model.create(data),
      null
    );
  }
}

