export const slugifyOptions = {
	replacement: "_", // replace spaces with replacement character, defaults to `-`
	// remove: undefined,
	remove: /[*+~()'"!:@Ã±]/g, // remove characters that match regex, defaults to `undefined`
	lower: true, // convert to lower case, defaults to `false`
	strict: false, // strip special characters except replacement, defaults to `false`
	// locale: "vi", // language code of the locale to use
	trim: true, // trim leading and trailing replacement chars, defaults to `true`
};

export default slugifyOptions