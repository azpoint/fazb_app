"use client";
//Dependencies
import { useState } from "react";
import { useActionState } from "react";
import { useRef } from "react";

//Components
import HintFeedBack from "@/src/components/panel/forms/controls/HintFeedback";
import FormButton from "@/src/components/panel/forms/controls/FormButton";
import YoutubeLinkField from "@/src/components/panel/forms/fields/YouTubeLinkField";
import MovField from "@/src/components/panel/forms/fields/MovementField";
import { FaCircleMinus } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";

//Actions & Options
import * as actions from "@/src/components/panel/forms/actions/createSuite";

export default function NewSuitesForm() {
    const [formState, formStateAction] = useActionState(actions.createSuite, {
        errors: {},
    });
    const [formValues, setFormValues] = useState({
        title: "",
        mov: ["", ""],
        created: "",
        rev: "",
        _length: "",
        edition: "",
        youtube_l: [""],
        description: "",
    });
    // const [description, setDescription] = useState("");
    const [suiteState, setSuiteState] = useState(false);
    const descriptionRef = useRef(null);

    //TODO: Binding to use server actions from a client component to a server component without formState. Binding call a function with predefined parameters.
    // const createCompositionAction = actions.createComposition.bind(
    // 	null,
    // 	description
    // );

    //Mov Fields Handler
    const handleMovFields = (code) => {
        if (code === "add" && formValues.mov.length < 12) {
            setFormValues((prevData) => ({
                ...prevData,
                mov: [...prevData.mov, ""],
            }));
        }
        if (code === "minus" && formValues.mov.length > 2) {
            setFormValues((prevData) => ({
                ...prevData,
                mov: prevData.mov.slice(0, -1),
            }));
        }
    };

    //Youtube Link Fields Handler
    const handleYTLFields = (code) => {
        if (code === "add" && formValues.youtube_l.length < 4) {
            setFormValues((prevData) => ({
                ...prevData,
                youtube_l: [...prevData.youtube_l, ""],
            }));
        }
        if (code === "minus" && formValues.youtube_l.length > 1) {
            setFormValues((prevData) => ({
                ...prevData,
                youtube_l: prevData.youtube_l.slice(0, -1),
            }));
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (formData) => {
        if (formData.get("created") !== "")
            formData.set(
                "created",
                new Date(formData.get("created")).toISOString()
            );
        if (formData.get("rev") !== "")
            formData.set("rev", new Date(formData.get("rev")).toISOString());
        formData.append("description", descriptionRef.current.innerHTML);

        const result = await formStateAction(formData)

        return result
    };

    return (
        <>
            <div className="h-[96vh] text-stone-900 pb-10 overflow-y-auto w-full">
                <h2 className="text-2xl font-bold text-center">Agregar Obra</h2>

                <form
                    // action={createCompositionAction}
                    // action={formStateAction}
                    action={handleSubmit}
                    className="pt-4 px-2 text-xl flex flex-wrap flex-col lg:flex-row"
                >
                    <div className="mx-auto xl:w-3/5">
                        {/* -------- Suite Type -------- */}
                        <h3 className="text-xl text-left font-semibold">
                            *Tipo de Obra
                        </h3>

                        <div className="mt-4 border-b-2 border-slate-300">
                            <div className="flex justify-between odd:bg-slate-300 py-2 px-2 rounded-md">
                                <label htmlFor="guitarra" className="w-full">
                                    Guitarra
                                </label>
                                <input
                                    type="radio"
                                    name="type"
                                    id="guitarra"
                                    value="guitarra"
                                    required
                                />
                            </div>

                            <div className="flex justify-between py-2 px-2">
                                <label htmlFor="coral" className="w-full">
                                    Música Coral A Capella
                                </label>
                                <input
                                    type="radio"
                                    name="type"
                                    id="coral"
                                    value="coral"
                                />
                            </div>

                            <div className="flex justify-between odd:bg-slate-300 py-2 px-2 rounded-md">
                                <label htmlFor="camara" className="w-full">
                                    Cámara
                                </label>
                                <input
                                    type="radio"
                                    name="type"
                                    id="camara"
                                    value="camara"
                                />
                            </div>

                            <div className="flex justify-between py-2 px-2">
                                <label
                                    htmlFor="orquesta-cuerdas"
                                    className="w-full"
                                >
                                    Orquesta de Cuerdas
                                </label>
                                <input
                                    type="radio"
                                    name="type"
                                    id="orquesta-cuerdas"
                                    value="orquesta-cuerdas"
                                />
                            </div>

                            <div className="flex justify-between odd:bg-slate-300 py-2 px-2 rounded-md">
                                <label
                                    htmlFor="orquesta-sinfonica"
                                    className="w-full"
                                >
                                    Orquesta Sinfónica
                                </label>
                                <input
                                    type="radio"
                                    name="type"
                                    id="orquesta-sinfonica"
                                    value="orquesta-sinfonica"
                                />
                            </div>

                            <div className="flex justify-between py-2 px-2">
                                <label htmlFor="piano" className="w-full">
                                    Piano
                                </label>
                                <input
                                    type="radio"
                                    name="type"
                                    id="piano"
                                    value="piano"
                                />
                            </div>
                        </div>

                        {/* -------- Data Fields -------- */}
                        <label
                            htmlFor="suite"
                            className="inline-flex items-start gap-4 mt-4 font-semibold"
                            onMouseDown={() => setSuiteState(!suiteState)}
                        >
                            Esta obra es una suite
                            <div className="relative align-">
                                <input
                                    type="checkbox"
                                    name=""
                                    id="suite"
                                    className="appearance-none w-6 h-6 border-[3px] border-sky-900 rounded-sm bg-slate-100 checked:bg-sky-700 checked:border-0"
                                />
                                <svg
                                    className="absolute w-4 h-4 top-1 left-1 peer-checked:block pointer-events-none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    // stroke="#000"
                                    stroke="#f1f5f9"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                        </label>

                        <div className="mt-4">
                            <div className="flex">
                                <label
                                    htmlFor="title"
                                    className="w-1/6 text-xl"
                                >
                                    *Título
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Introduce el Título aquí"
                                    value={formValues.title}
                                    onChange={handleInputChange}
                                    className={`field ${
                                        formState.errors?.title
                                            ? "border-rose-600"
                                            : null
                                    }`}
                                    required
                                    autoFocus
                                />
                            </div>
                            <HintFeedBack
                                error={formState.errors.title?.join(", ")}
                                errorStyle="text-rose-600 text-right"
                                hint="Sólo letras, números, espacios ó guión"
                                hintStyle="text-sky-600 text-right"
                            />
                        </div>

                        <div className="mt-4 space-y-2">
                            {suiteState ? (
                                <div className="flex justify-end mt-8 gap-x-4">
                                    <div className="font-semibold">
                                        Cantidad de Movimientos
                                    </div>
                                    <FaCircleMinus
                                        className="w-8 h-8 text-sky-900 active:scale-95 cursor-pointer hover:text-sky-700"
                                        onClick={() => handleMovFields("minus")}
                                    />
                                    <div className="font-semibold">{`${formValues.mov.length}`}</div>
                                    <FaCirclePlus
                                        className="w-8 h-8 text-sky-900 active:scale-95 cursor-pointer hover:text-sky-700"
                                        onClick={() => handleMovFields("add")}
                                    />
                                </div>
                            ) : null}
                            {suiteState
                                ? formValues.mov.map((_, index) => (
                                      <MovField
                                          key={index}
                                          _index={index}
                                          formState={formState}
                                      />
                                  ))
                                : null}
                        </div>

                        <div className="mt-8">
                            <div className="flex">
                                <label htmlFor="rev" className="w-1/6 text-xl">
                                    *Fecha
                                </label>
                                <input
                                    type="date"
                                    id="created"
                                    name="created"
                                    value={formValues.created}
                                    onChange={handleInputChange}
                                    className={`field ${
                                        formState.errors?.created
                                            ? "border-rose-600"
                                            : null
                                    }`}
                                />
                            </div>
                            <HintFeedBack
                                error={formState.errors.created?.join(", ")}
                                errorStyle="text-rose-600 text-right"
                                hint="Si no sabes el día exacto usa el primero del mes"
                                hintStyle="text-sky-600 text-right"
                            />
                        </div>

                        <div className="mt-4">
                            <div className="flex">
                                <label htmlFor="rev" className="w-1/6 text-xl">
                                    Revisión
                                </label>
                                <input
                                    type="date"
                                    id="rev"
                                    name="rev"
                                    className={`field ${
                                        formState.errors?.rev
                                            ? "border-rose-600"
                                            : null
                                    }`}
                                />
                            </div>
                            <HintFeedBack
                                error={formState.errors.rev?.join(", ")}
                                errorStyle="text-rose-600 text-right"
                                hint="Si no sabes el día exacto usa el primero del mes"
                                hintStyle="text-sky-600 text-right"
                            />
                        </div>

                        <div className="mt-4">
                            <div className="flex">
                                <label
                                    htmlFor="length"
                                    className="w-1/6 text-xl"
                                >
                                    Duración
                                </label>
                                <input
                                    type="text"
                                    id="_length"
                                    name="_length"
                                    placeholder="Formato Tiempo: H:MM:SS en números"
                                    className={`field ${
                                        formState.errors?._length
                                            ? "border-rose-600"
                                            : null
                                    }`}
                                />
                            </div>
                            <HintFeedBack
                                error={formState.errors._length?.join(", ")}
                                errorStyle="text-rose-600 text-right"
                                hint="Formato Tiempo: H:MM:SS en números"
                                hintStyle="text-sky-600 text-right"
                            />
                        </div>

                        <div className="mt-4">
                            <div className="flex">
                                <label
                                    htmlFor="edition"
                                    className="w-1/6 text-xl"
                                >
                                    Edición
                                </label>
                                <input
                                    type="text"
                                    id="edition"
                                    name="edition"
                                    placeholder="Introduce Editor"
                                    className={`field ${
                                        formState.errors?.edition
                                            ? "border-rose-600"
                                            : null
                                    }`}
                                />
                            </div>
                            <HintFeedBack
                                error={formState.errors.edition?.join(", ")}
                                errorStyle="text-rose-600 text-right"
                                hint="Hasta 50 caracteres"
                                hintStyle="text-sky-600 text-right"
                            />
                        </div>

                        <div className="space-y-2 my-8">
                            <div className="flex justify-end mt-2 gap-x-4">
                                <div className="font-semibold">
                                    Cantidad de links de YouTube
                                </div>
                                <FaCircleMinus
                                    className="w-8 h-8 text-sky-900 active:scale-95 cursor-pointer hover:text-sky-700"
                                    onClick={() => handleYTLFields("minus")}
                                />
                                <div className="font-semibold">{`${formValues.youtube_l.length}`}</div>
                                <FaCirclePlus
                                    className="w-8 h-8 text-sky-900 active:scale-95 cursor-pointer hover:text-sky-700"
                                    onClick={() => handleYTLFields("add")}
                                />
                            </div>
                            {formValues.youtube_l.map((_, index) => (
                                <YoutubeLinkField
                                    key={index}
                                    _index={index}
                                    formState={formState}
                                />
                            ))}
                        </div>

                        {/* -------- File Input -------- */}
                        <div className="space-y-2 my-8">
                            <div className="grid grid-cols-2 items-center">
                                <label
                                    htmlFor="images"
                                    className="text-xl justify-self-start"
                                >
                                    Imágenes
                                </label>
                                <input
                                    type="file"
                                    id="images"
                                    name="images"
                                    className={`w-5/6 outline-none justify-self-end ${
                                        formState.errors?.images
                                            ? "border-rose-600"
                                            : null
                                    } file:mr-4 file:py-2 file:px-6
									file:rounded-full file:border-0
									file:text-xl file:bg-sky-900 file:text-stone-100
									hover:file:cursor-pointer hover:file:bg-sky-700 active:file:scale-95`}
                                    placeholder="Introduce Editor"
                                    multiple
                                />
                            </div>
                            <HintFeedBack
                                error={formState.errors.images?.join(", ")}
                                errorStyle="text-rose-600 text-right"
                                hint="Sólo imagenes JPG ó PNG"
                                hintStyle="text-sky-600 text-right"
                            />
                        </div>

                        <div className="space-y-2 my-8">
                            <div className="grid grid-cols-2 items-center">
                                <label
                                    htmlFor="audios"
                                    className="text-xl justify-self-start"
                                >
                                    Audios
                                </label>
                                <input
                                    type="file"
                                    id="audios"
                                    name="audios"
                                    className={`w-5/6 outline-none justify-self-end ${
                                        formState.errors?.audios
                                            ? "border-rose-600"
                                            : null
                                    } file:mr-4 file:py-2 file:px-6
									file:rounded-full file:border-0
									file:text-xl file:bg-sky-900 file:text-stone-100
									hover:file:cursor-pointer hover:file:bg-sky-700 active:file:scale-95`}
                                    placeholder="Introduce Editor"
                                    multiple
                                />
                            </div>
                            <HintFeedBack
                                error={formState.errors.audios?.join(", ")}
                                errorStyle="text-rose-600 text-right"
                                hint="Sólo archivos mp3"
                                hintStyle="text-sky-600 text-right"
                            />
                        </div>

                        {/* -------- Text Input -------- */}
                        <div className="flex flex-col mt-4">
                            <label
                                htmlFor="description"
                                className="font-semibold"
                            >
                                Descripción y/o anotaciones
                            </label>

                            <div
                                ref={descriptionRef}
                                contentEditable
                                suppressContentEditableWarning
                                className="bg-white min-h-[35vh] mt-4 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                                placeholder="Escribe aquí toda la información de la obra..."
                                data-placeholder="Escribe aquí toda la información de la obra..."
                                style={{
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word",
                                    lineHeight: "1.6",
                                    fontSize: "16px",
                                    padding: "1rem",
                                    overflow: "auto",
                                }}
                            />
                        </div>

                        <div>
                            {formState.errors._form ? (
                                <div className="p-2 mt-4 bg-red-200 border border-red-400 rounded">
                                    {formState.errors._form?.join(", ")}
                                </div>
                            ) : null}

                            <FormButton>Agregar Obra</FormButton>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
