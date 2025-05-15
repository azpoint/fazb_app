'use client'
import HintFeedBack from "@/src/components/panel/forms/controls/HintFeedback";

export default function YoutubeLinkField({ _index, formState, editValue, onYTChange }) {
	const handleChange = (event) => {
        onYTChange(_index, event.target.value); // Call parent's handler
    };
	return (
		<div>
			<div className="flex">
				<label htmlFor="youtube_l" className="w-1/6 text-xl">
					YouTube Link
				</label>
				<input
					type="text"
					id="youtube_l"
					name="youtube_l"
					placeholder="https://www.youtube.com/watch?v=Y3OUDRQMcxs"
					className={`field ${
						formState.errors?.youtube_l && formState.errors?.youtube_l[_index] ? "border-rose-600" : null
					}`}
					value={editValue}
					onChange={handleChange}
				/>
			</div>
			<div className="flex justify-end gap-x-2">
				<HintFeedBack
					error={formState.errors?.youtube_l && formState.errors?.youtube_l[_index] ? formState.errors.youtube_l[_index]: null}
					errorStyle="text-rose-600 text-right"
					hint="Copia el link de la barra de dirección de Youtube"
					hintStyle="text-sky-600 text-right"
				/>
				
			</div>
		</div>
	);
}