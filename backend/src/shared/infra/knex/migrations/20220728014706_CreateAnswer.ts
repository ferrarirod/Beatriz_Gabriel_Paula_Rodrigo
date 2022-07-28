import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("answers", function (table) {
    table.string("id").primary().notNullable();
    table
      .string("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("cascade")
      .onUpdate("cascade");
    table
      .string("question_id")
      .notNullable()
      .references("id")
      .inTable("questions")
      .onDelete("cascade")
      .onUpdate("cascade");
    table
      .string("option_id")
      .notNullable()
      .references("id")
      .inTable("options")
      .onDelete("cascade")
      .onUpdate("cascade");
    table
      .string("task_id")
      .notNullable()
      .references("id")
      .inTable("tasks")
      .onDelete("cascade")
      .onUpdate("cascade");
    table.dateTime("created_at").notNullable();
    table.dateTime("updated_at").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("answers");
}
