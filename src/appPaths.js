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
	},
	suite(suite_id) {
		return `/suites/${suite_id}`
	}

};

export default appPaths;
