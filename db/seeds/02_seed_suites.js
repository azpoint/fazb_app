exports.seed = async function (knex) {
	// Ensure at least one user exists
	const [user] = await knex("users").where({ user_id: 1 }).first();
	if (!user) throw new Error("No users found. Cannot seed suites.");

	console.log(user);

	await knex("suites").del();

	await knex("suites").insert([
		{
			author_id: user.user_id,
			author: user.full_name,
			type: "guitarra",
			title: "Test Suite 1",
			slug: "test-suite-1",
			mov: JSON.stringify([
				"Test Suite mov 1",
				"Test Suite mov 2",
				"Test Suite mov 3",
			]),
			suite_created_at: "2023-12-01",
			suite_rev_at: "2024-01-15",
			suite_length: "12:04:21",
			suite_edition: "First",
			notes: "My favorite streaming platform is [YouTube](https://youtube.com)",
			images: JSON.stringify(["image1.jpg", "image2.jpg", "image2.jpg"]),
			audios: JSON.stringify(["audio1.jpg", "audio2.jpg", "audio3.jpg"]),
			yt_links: JSON.stringify([
				"https://youtu.be/dQw4w9WgXcQ",
				"https://youtu.be/dQw4w9WgXcQ",
				"https://youtu.be/dQw4w9WgXcQ",
			]),
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
	]);
};
