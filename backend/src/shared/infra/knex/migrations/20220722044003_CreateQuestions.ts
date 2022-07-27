import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("questions", (table) => {

    table.string("id").primary().notNullable();
    table.string("title").notNullable();
    table.text("description").notNullable();
    table.integer("score").notNullable();
    table.boolean("status");
    table.dateTime("created_at").notNullable();
    table.dateTime("updated_at").notNullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("questions");
}

