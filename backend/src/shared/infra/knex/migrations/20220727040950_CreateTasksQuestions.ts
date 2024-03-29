import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("tasks_questions", (table) => {
        table.string("id").primary().notNullable();
        table.string("question_id").references('id').inTable('questions').onDelete("cascade").onUpdate("cascade");
        table.string("task_id").references('id').inTable('tasks').onDelete("cascade").onUpdate("cascade");
        table.dateTime("created_at").notNullable();
        table.dateTime("updated_at").notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("tasks_questions");
}

