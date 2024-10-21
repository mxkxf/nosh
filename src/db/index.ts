import "dotenv/config";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { Database } from "./types";

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: +(process.env.DB_PORT || 5432),
    max: 10,
  }),
});

const db = new Kysely<Database>({
  dialect,
});

export default db;
