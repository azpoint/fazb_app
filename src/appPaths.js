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
	suite(slug) {
		return `/suites/${slug}`
	}

};

export default appPaths;
