const appPaths = {
    home() {
        return `/`;
    },
    mainPanel() {
        return `/admin/panel`;
    },
    createSuite() {
        return `/admin/panel/new-suite`;
    },
    editSuite(suite_id) {
        return `/admin/panel/edit-suite/${suite_id}`;
    },
    suite(slug, title) {
        return `/suites/${slug}?title=${title}`;
    },
    suites(slug) {
        return `/suites?type=${slug}`;
    },
};

export default appPaths;
