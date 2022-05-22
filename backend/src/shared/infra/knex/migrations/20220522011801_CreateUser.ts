import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.string("id").primary().notNullable();
    table.string("name").notNullable();
    table.string("email").notNullable().unique();
    table.string("cpf").notNullable().unique();
    table.string("password").notNullable();
    table.integer("type").notNullable();
    table.dateTime("created_at").notNullable();
    table.dateTime("updated_at").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users");
}
