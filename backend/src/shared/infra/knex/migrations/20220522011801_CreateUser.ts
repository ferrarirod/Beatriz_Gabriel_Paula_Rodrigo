import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.string("name").notNullable();
    table.string("email").unique().notNullable();
    table.string("cpf").unique().notNullable();
    table.string("password").notNullable();
    table.integer("score").notNullable()
    table.integer("type").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
