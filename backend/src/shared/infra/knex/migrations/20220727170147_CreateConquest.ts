import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("conquests", (table) => {
        table.string("id").primary().notNullable();
        table.string("award_id").notNullable().references('id').inTable('awards').onDelete("cascade").onUpdate("cascade");
        table.string("conquest_id").notNullable().references('id').inTable('conquests').onDelete("cascade").onUpdate("cascade");
        table.dateTime("created_at").notNullable();
        table.dateTime("updated_at").notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("conquests");
}

