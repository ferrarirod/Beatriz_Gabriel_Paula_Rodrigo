import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("classes", (table) => {

    table.string("id").primary().notNullable();
    table.string("title").notNullable();
    table.string("module").notNullable();
    table.text("content").notNullable();
    table.string("link").notNullable();
    table.integer('score').notNullable();
    table.dateTime("created_at").notNullable();
    table.dateTime("updated_at").notNullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("classes");
}

