const appPaths = {
	home() {
		return `/`
	},
	mainPanel() {
		return `/panel`
	},
	createComposition() {
		return `/panel/suites/new`
	}
	,
	editPhotos(slug) {
		return `/panel/suites/${slug}/photo-edit`
	}
}

export default appPaths