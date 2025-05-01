/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("users", function (table) {
		table.increments("user_id").primary();
		table.string("full_name", 100);
		table.string("username", 100);
		table.string("email", 150).notNullable().unique();
		table.timestamps(true, true);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable("users");
};