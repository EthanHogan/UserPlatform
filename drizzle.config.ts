import type { Config } from "drizzle-kit";
import config from "./config.json";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./drizzle/schema.ts",
  out: "./drizzle/generated",
  driver: "mysql2",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
  tablesFilter: [`${config.dbTablePrefix}_*`],
} satisfies Config;
