import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("users")
    .addColumn("id", "varchar", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();

  await db.schema
    .createTable("feeds")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("user_id", "varchar", (col) =>
      col.references("users.id").onDelete("cascade").notNull()
    )
    .addColumn("title", "varchar", (col) => col.notNull().unique())
    .addColumn("url", "varchar", (col) => col.notNull().unique())
    .addColumn("description", "text")
    .execute();

  await db.schema
    .createIndex("feed_user_id_idx")
    .on("feeds")
    .column("user_id")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("feeds").execute();
  await db.schema.dropTable("users").execute();
}
