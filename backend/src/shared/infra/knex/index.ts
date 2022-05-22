import knex from "knex";

const connection = knex({
    client: "mysql",
    connection:{
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "web_masters",
    }
})

export { connection }