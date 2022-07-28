import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("finished_classes", (table) => {
    table.string("id").primary().notNullable();
    table
      .string("class_id")
      .notNullable()
      .references("id")
      .inTable("classes")
      .onDelete("cascade")
      .onUpdate("cascade");
    table
      .string("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("cascade")
      .onUpdate("cascade");
    table.dateTime("created_at").notNullable();
    table.dateTime("updated_at").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("finished_classes");
}
