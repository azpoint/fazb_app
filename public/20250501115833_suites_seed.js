/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("suites").del();

	// Insert new suite data
	await knex("suites").insert([
		{
			author_id: 1, // Make sure user_id 1 exists in the users table
			type: "guitarra",
			title: "Test Suite 1",
			slug: "test-suite-1",
			mov: ["Test Suite mov 1", "Test Suite mov 2", "Test Suite mov 3"],
			suite_created_at: "2023-12-01",
			suite_rev_at: "2024-01-15",
			suite_length: "12:04:21",
			suite_edition: "First",
			notes: "My favorite search engine is [Duck Duck Go](https://duckduckgo.com 'The best search engine for privacy - this is actually fake')",
			images: ["image1.jpg", "image2.jpg", "image2.jpg"],
			audios: ["audio1.jpg", "audio2.jpg", "audio3.jpg"],
			yt_links: [
				"https://youtu.be/dQw4w9WgXcQ",
				"https://youtu.be/dQw4w9WgXcQ",
				"https://youtu.be/dQw4w9WgXcQ",
			],
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
	]);
};
