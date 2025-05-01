/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("suites", function (table) {
		table.increments("suite_id").primary();
		table
			.integer("author_id")
			.unsigned()
			.notNullable()
			.references("user_id")
			.inTable("users")
			.onDelete("CASCADE");
		table.string("type").notNullable();
		table.string("title").notNullable();
		table.string("slug").notNullable().unique();
		table.text("mov");
		table.date("suite_created_at").notNullable();
		table.date("suite_rev_at");
		table.string("suite_length");
		table.string("suite_edition");
		table.text("yt_links");
		table.text("images");
		table.text("audios");
		table.text("notes");
		table.timestamps(true, true);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable("suites");
};
