// Update with your config settings.
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
	development: {
		client: "pg", //process.env.DB_CLIENT,
		connection: "postgresql://fazbsys:muestramelasobras@db-fazb:5432/fazb-db", //process.env.DATABASE_URL,
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			directory: "./migrations",
		},
		seeds: {
			directory: "./seeds",
		},
	}
};
