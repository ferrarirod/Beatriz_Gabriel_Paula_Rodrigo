import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("comments", (table) => {

        table.string("id").primary().notNullable();
        table.string("class_id").notNullable().references('id').inTable('classes').onDelete("cascade");
        table.string("user_id").notNullable().references('id').inTable('users').onDelete("cascade");
        table.text("content").notNullable();
        table.boolean("is_anonymous").notNullable();
        table.dateTime("created_at").notNullable();
        table.dateTime("updated_at").notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("comments");
}

