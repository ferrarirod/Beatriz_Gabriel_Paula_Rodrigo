const config = {
  client: "mysql",
  connection: {
    host: "localhost",
    port: 13306,
    user: "root",
    password: "password",
    database: "web_masters",
  },
  migrations: {
    tableName: "knex_migrations",
    directory: ["./src/shared/infra/knex/migrations"],
    extension: "ts",
  },
};

module.exports = config;
