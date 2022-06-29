import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("tasks", (table) => {

    table.string("id").primary().notNullable();
    table.string("title").notNullable();
    table.string("class_id").notNullable().references('id').inTable('classes').onDelete("cascade").onUpdate("cascade");
    table.text("description").notNullable();
    table.boolean("status").notNullable();
    table.dateTime("created_at").notNullable();
    table.dateTime("updated_at").notNullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("tasks");
}

