export default function dateToObjIsoString(date) {
	const dateObjToString = new Date(date);
	const month =
		"" + (dateObjToString.getMonth() + 1).toString().padStart(2, "0");
	const day = "" + dateObjToString.getDate().toString().padStart(2, "0");
	const year = dateObjToString.getFullYear();

	return [year, month, day].join("-");
}
