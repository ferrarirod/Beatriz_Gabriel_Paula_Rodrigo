import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("modules", (table) => {
        table.string("id").primary().notNullable();
        table.string("name").notNullable();
        table.text("description").notNullable();
        table.dateTime("created_at").notNullable();
        table.dateTime("updated_at").notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("modules");
}

