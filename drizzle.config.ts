import { type Config } from "drizzle-kit";

import { env } from "./src/env.mjs";

import config from "./config.json";

export default {
  schema: "./src/server/db/schema.ts",
  driver: "mysql2",
  dbCredentials: {
    uri: env.DATABASE_URL,
  },
  tablesFilter: [`${config.dbTablePrefix}_*`],
} satisfies Config;
