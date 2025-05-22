const appPaths = {
	home() {
		return `/`;
	},
	mainPanel() {
		return `/panel`;
	},
	createSuite() {
		return `/panel/new-suite`;
	},
	editSuite(slug) {
		return `/panel/edit-suite/${slug}`;
	},
	deleteSuite(suite_id) {
		return `/panel/delete-suite/${suite_id}`
	}

};

export default appPaths;
