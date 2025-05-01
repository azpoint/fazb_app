/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("users").del();
	await knex("users").insert([
		{
			user_id: 1,
			full_name: "Francisco Zapata Bello",
			username: "fazb",
			email: "franzapata2@gmail.com",
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			user_id: 2,
			full_name: "admin",
			username: "sys_admin",
			email: "mail@mail.com",
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
	]);
};
