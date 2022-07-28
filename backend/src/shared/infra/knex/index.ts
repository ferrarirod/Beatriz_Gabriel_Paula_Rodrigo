import knex from "knex";

const connection = knex({
    client: "mysql",
    connection:{
        host: "localhost",
        port: 13306,
        user: "root",
        password: "password",
        database: "web_masters",
    }
})

export { connection }