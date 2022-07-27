import { table } from "console";
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("questions", function (table) {
    table.string("expected_answer").references('id').inTable('options').onDelete("cascade").onUpdate("cascade");;
  });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.hasColumn("questions","expected_answer").then(async exists => {
        if(exists){
            await knex.schema.table("questions", function (table) {
                table.dropColumn("expected_answer")
            })
        }
    })
}
