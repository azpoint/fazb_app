'use client'
import HintFeedBack from "@/src/components/panel/forms/controls/HintFeedback";

export default function YoutubeLinkField({ _index, formState }) {
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
					className={`w-5/6 rounded-md px-2 py-1 text-xl focus:border-sky-700 border-2 border-solid outline-none ${
						formState.errors?.youtube_l && formState.errors?.youtube_l[_index] ? "border-rose-600" : null
					}`}
				/>
			</div>
			<div className="flex justify-end gap-x-2">
				<HintFeedBack
					error={formState.errors?.youtube_l && formState.errors?.youtube_l[_index] ? formState.errors.youtube_l[_index]: null}
					errorStyle="text-rose-600 text-right"
					hint="Copia el link de la barra de dirección de Youtube"
					hintStyle="text-stone-900 text-right"
				/>
				
			</div>
		</div>
	);
}