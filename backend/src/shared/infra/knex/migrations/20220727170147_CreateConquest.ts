import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("conquests", (table) => {
        table.string("id").primary().notNullable();
        table.string("award_id").notNullable().references('id').inTable('awards').onDelete("cascade").onUpdate("cascade");
        table.string("user_id").notNullable().references('id').inTable('users').onDelete("cascade").onUpdate("cascade");
        table.unique(['award_id', 'user_id']);
        table.date("date").notNullable();
        table.dateTime("created_at").notNullable();
        table.dateTime("updated_at").notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("conquests");
}

