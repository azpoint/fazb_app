export const quillModules = {
	toolbar: [
		// [{ font: [] }],
		[{ header: [1, 2, 3, false] }],
		["bold", "italic", "underline", "strike", "blockquote"],
		[{ align: [] }],
		[{ list: "ordered" }, { list: "bullet" }],
		// [{ script: "sub" }, { script: "super" }],
		// [{ color: [] }],
		["link"],
		["clean"],
		// [{ indent: "-1" }, { indent: "+1" }],
		// [{ size: ["small", false, "large", "huge"] }],
		// ["code-block"],
	],
	clipboard: {
		matchVisual: false,
	},
};

export const quillFormats = [
	"header",
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"list",
	"bullet",
	"link",
	// "image",
	"align",
	"color",
	// "code-block",
];