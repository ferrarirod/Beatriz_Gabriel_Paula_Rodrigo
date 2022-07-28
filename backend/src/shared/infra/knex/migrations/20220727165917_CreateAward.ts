import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("awards", (table) => {
        table.string("id").primary().notNullable();
        table.string("name").notNullable();
        table.text("description").notNullable();
        table.integer("score").notNullable();
        table.dateTime("created_at").notNullable();
        table.dateTime("updated_at").notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("awards");
}

