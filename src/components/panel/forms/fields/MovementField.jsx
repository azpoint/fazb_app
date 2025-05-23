'use client'
//Components
import HintFeedBack from "@/src/components/panel/forms/controls/HintFeedback";

export default function MovField({_index, formState, editValue, onMovChange}) {
	const handleChange = (event) => {
        onMovChange(_index, event.target.value); // Call parent's handler
    };
	
	return (
		<div className="flex flex-col items-end">
			<div className="flex w-5/6">
				<label htmlFor="mov" className="w-1/6 text-xl">
					{`Mov. ${_index + 1}`}
				</label>
				<input
					type="text"
					id="mov"
					name="mov"
					placeholder="Nombre del Movimiento"
					className={`field ${
						formState.errors?.mov && formState.errors?.mov[_index] ? "border-rose-600" : null
					}`}
					value={editValue}
					onChange={handleChange}
				/>
			</div>
			<div className="flex justify-end gap-x-2">
				<HintFeedBack
					error={formState.errors?.mov && formState.errors?.mov[_index] ? formState.errors.mov[_index]: null}
					errorStyle="text-rose-600 text-right"
					hint="Hasta 30 caracteres"
					hintStyle="text-stone-900 text-right"
				/>
				
			</div>
		</div>
	);
}