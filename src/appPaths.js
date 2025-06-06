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
    editSuite(slug) {
        return `/admin/panel/edit-suite/${slug}`;
    },
    suite(slug, title) {
        return `/suites/${slug}?title=${title}`;
    },
    suites() {
        return "/suites";
    },
};

export default appPaths;
