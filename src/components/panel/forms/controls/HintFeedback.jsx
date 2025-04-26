'use client'
export default function HintFeedBack({
	error,
	errorStyle,
	hint,
	hintStyle,
}) {
	return (
		<>
			{error ? (
				<p className={errorStyle}>{error}</p>
			) : (
				<p className={hintStyle}>{hint}</p>
			)}
		</>
	);
}