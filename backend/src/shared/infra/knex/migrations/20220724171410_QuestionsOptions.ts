import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("questions_options", (table) => {
        table.string("id").primary().notNullable();
        table.string("question_id").notNullable().references('id').inTable('questions').onDelete("cascade").onUpdate("cascade");
        table.string("option_id").notNullable().references('id').inTable('options').onDelete("cascade").onUpdate("cascade");
        table.dateTime("created_at").notNullable();
        table.dateTime("updated_at").notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("options");
}

