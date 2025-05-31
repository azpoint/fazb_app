"use client";
//Dependencies
import { useState, useRef, useEffect } from "react";
import { useActionState } from "react";
import { Suspense } from "react";
import Image from "next/image";

//Text Editor
import MDXEditorWrapper from "@/src/components/panel/TextEditor";

//Components
import HintFeedBack from "@/src/components/panel/forms/controls/HintFeedback";
import FormButton from "@/src/components/panel/forms/controls/FormButton";
import YoutubeLinkField from "@/src/components/panel/forms/fields/YouTubeLinkField";
import MovField from "@/src/components/panel/forms/fields/MovementField";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import ImageCard from "@/src/components/panel/cards/ImageCard";
import AudioCard from "@/src/components/panel/cards/AudioCard";

//Actions & Options
import { editSuite } from "@/src/components/panel/forms/actions/editSuite";
import dateToObjIsoString from "@/lib/dateObjToIsoString";

export default function EditSuitesForm({ suite }) {
    const originalImagesArray = useRef(
        suite.images
            ? JSON.parse(suite.images).map((image) => image.filePath)
            : [""]
    );
    const originalAudiosArray = useRef(
        suite.audios
            ? JSON.parse(suite.audios).map((audio) => audio.filePath)
            : [""]
    );

    const originalAudiosDescriptionArray = useRef(
        suite.audios
            ? JSON.parse(suite.audios).map((audio) => audio.fileDescription)
            : [""]
    );

    const [formState, formStateAction] = useActionState(editSuite, {
        errors: {},
    });

    const [editorContent, setEditorContent] = useState("");

    const [formValues, setFormValues] = useState({
        isSuite: suite?.mov ? true : false,
        title: suite.title,
        type: suite.type,
        mov: suite.mov ? JSON.parse(suite.mov) : ["", ""],
        created: dateToObjIsoString(suite.created),
        rev: suite.rev ? dateToObjIsoString(suite.rev) : "",
        _length: suite.timeLength || "",
        edition: suite.edition || "",
        youtube_l: suite.ytLinks
            ? JSON.parse(suite.ytLinks).map(
                  (ytl) => "https://www.youtube.com/watch?v=" + ytl
              )
            : [""],
        description: "",
        images_to_delete: originalImagesArray.current,
        audios_to_delete: originalAudiosArray.current,
    });

    //Force re-render when formState.errors change to show all states correctly, specially the isSuite and radio buttons
    useEffect(() => {
        setFormValues((prev) => ({
            ...prev,
        }));
    }, [formState.errors]);

    //Mov Fields Handler.
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

    //Handle Change in the Mov fields values.
    const handleMovChange = (index, value) => {
        const newMov = [...formValues.mov];
        newMov[index] = value;
        setFormValues({ ...formValues, mov: newMov });
    };

    //Youtube Link Fields Handler.
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

    //Handle Change in the YTLink fields values.
    const handleYTChange = (index, value) => {
        const newYTL = [...formValues.youtube_l];
        newYTL[index] = value;
        setFormValues({ ...formValues, youtube_l: newYTL });
    };

    //Handle the rest of the form except the text editor.
    const handleInputChange = (event) => {
        const { name, value, checked, type } = event.target;

        setFormValues((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    //Handle Image card
    const handleImageCard = (e) => {
        const clickedIndex = e.currentTarget.id;
        const imagesArrayToEdit = [...formValues.images_to_delete];

        if (imagesArrayToEdit[clickedIndex] === "del") {
            imagesArrayToEdit[clickedIndex] =
                originalImagesArray.current[clickedIndex];
        } else {
            imagesArrayToEdit[clickedIndex] = "del";
        }

        setFormValues({ ...formValues, images_to_delete: imagesArrayToEdit });
    };

    //Handle Audio Card
    const handleAudioCard = (e) => {
        const clickedIndex = e.currentTarget.id;
        const audiosArrayToEdit = [...formValues.audios_to_delete];

        if (audiosArrayToEdit[clickedIndex] === "del") {
            audiosArrayToEdit[clickedIndex] =
                originalAudiosArray.current[clickedIndex];
        } else {
            audiosArrayToEdit[clickedIndex] = "del";
        }

        setFormValues({ ...formValues, audios_to_delete: audiosArrayToEdit });
    };

    //Format date string and append the description(Text editor) to the formData before submit.
    const handleSubmit = async (formData) => {
        if (formData.get("created") !== "")
            formData.set(
                "created",
                new Date(formData.get("created")).toISOString()
            );

        if (formData.get("rev") !== "")
            formData.set("rev", new Date(formData.get("rev")).toISOString());

        formData.append("description", editorContent);
        formData.append("suite_id", suite.suite_id);

        let imagesToDelete = formValues.images_to_delete
            .map((image, index) => {
                if (image === "del") return originalImagesArray.current[index];
                else return null;
            })
            .filter((fileName) => fileName !== null);

        formData.append("images_to_delete", JSON.stringify(imagesToDelete));

        let audiosToDelete = formValues.audios_to_delete
            .map((audio, index) => {
                if (audio === "del") return originalAudiosArray.current[index];
                else return null;
            })
            .filter((fileName) => fileName !== null);

        formData.append("audios_to_delete", JSON.stringify(audiosToDelete));

        formStateAction(formData);
    };

    return (
        <>
            <div className="h-[96vh] text-stone-900 pb-10 overflow-y-auto w-full">
                <h2 className="text-4xl font-bold text-center text-sky-800">
                    Editar {suite.title}
                </h2>

                <form
                    action={handleSubmit}
                    className="mt-8 px-2 text-xl flex flex-wrap flex-col lg:flex-row"
                >
                    <div className="mx-auto xl:w-3/5">
                        {/* -------- Suite Type -------- */}
                        <h3 className="text-xl text-left font-semibold">
                            *Tipo de Obra
                        </h3>
                        <div className="mt-4 border-b-2 border-slate-300 pb-2">
                            <div className="flex justify-between odd:bg-slate-300 py-2 px-2 rounded-md">
                                <label htmlFor="guitarra" className="w-full">
                                    Guitarra
                                </label>
                                <input
                                    type="radio"
                                    name="type"
                                    id="guitarra"
                                    value="guitarra"
                                    checked={formValues.type === "guitarra"}
                                    onChange={handleInputChange}
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
                                    checked={formValues.type === "coral"}
                                    onChange={handleInputChange}
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
                                    checked={formValues.type === "camara"}
                                    onChange={handleInputChange}
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
                                    checked={
                                        formValues.type === "orquesta-cuerdas"
                                    }
                                    onChange={handleInputChange}
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
                                    checked={
                                        formValues.type === "orquesta-sinfonica"
                                    }
                                    onChange={handleInputChange}
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
                                    checked={formValues.type == "piano"}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        {/* -------- Data Fields -------- */}
                        <label
                            htmlFor="suite"
                            className="inline-flex items-start gap-4 mt-8 font-semibold"
                        >
                            Esta obra es una suite
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    name="isSuite"
                                    id="suite"
                                    checked={formValues.isSuite}
                                    onChange={handleInputChange}
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
                                        formState?.errors?.title
                                            ? "border-rose-600"
                                            : null
                                    }`}
                                    required
                                    autoFocus
                                />
                            </div>
                            <HintFeedBack
                                error={formState?.errors.title?.join(", ")}
                                errorStyle="text-rose-600 text-right"
                                hint="Sólo letras, números, espacios ó guión"
                                hintStyle="text-sky-600 text-right"
                            />
                        </div>
                        <div className="mt-4 space-y-2">
                            {formValues.isSuite ? (
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
                            {formValues.isSuite
                                ? formValues.mov.map((_, index) => (
                                      <MovField
                                          key={index}
                                          _index={index}
                                          formState={formState}
                                          editValue={formValues.mov[index]}
                                          onMovChange={handleMovChange}
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
                                    className={`field ${
                                        formState?.errors?.created
                                            ? "border-rose-600"
                                            : null
                                    }`}
                                    value={formValues.created}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <HintFeedBack
                                error={formState?.errors.created?.join(", ")}
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
                                        formState?.errors?.rev
                                            ? "border-rose-600"
                                            : null
                                    }`}
                                    value={formValues.rev}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <HintFeedBack
                                error={formState?.errors.rev?.join(", ")}
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
                                        formState?.errors?._length
                                            ? "border-rose-600"
                                            : null
                                    }`}
                                    value={formValues._length}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <HintFeedBack
                                error={formState?.errors._length?.join(", ")}
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
                                        formState?.errors?.edition
                                            ? "border-rose-600"
                                            : null
                                    }`}
                                    value={formValues.edition}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <HintFeedBack
                                error={formState?.errors.edition?.join(", ")}
                                errorStyle="text-rose-600 text-right"
                                hint="Hasta 50 caracteres"
                                hintStyle="text-sky-600 text-right"
                            />
                        </div>
                        <div className="space-y-2 my-8 border-b-2 border-slate-300 pb-10">
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
                                    editValue={formValues.youtube_l[index]}
                                    onYTChange={handleYTChange}
                                />
                            ))}
                        </div>

                        {/* -------- File Input -------- */}

                        {/* Image Gallery */}

                        <h3 className="text-2xl font-bold text-center text-stone-900">
                            Editar Galería
                        </h3>

                        <div className="container mx-auto px-4 py-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                                {originalImagesArray.current[0] == "" ? (
                                    <>
                                        <div className="col-span-full flex justify-center">
                                            <Image
                                                src={`/desert_plant.gif`}
                                                width={800}
                                                height={600}
                                                alt="Empty space"
                                                unoptimized
                                            />
                                        </div>
                                    </>
                                ) : (
                                    originalImagesArray.current.map(
                                        (image, index) => (
                                            <ImageCard
                                                key={"card" + index}
                                                image={image}
                                                id={index}
                                                handleImageCard={
                                                    handleImageCard
                                                }
                                                visibility={
                                                    formValues.images_to_delete[
                                                        index
                                                    ] === "del"
                                                        ? ""
                                                        : "hidden"
                                                }
                                            />
                                        )
                                    )
                                )}
                            </div>
                        </div>

                        {/* Image Input */}

                        <div className="space-y-2 my-8 border-b-2 border-slate-300 pb-10">
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
                                        formState?.errors?.images
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

                        {/* Audio Gallery */}

                        <h3 className="text-2xl font-bold text-center text-stone-900">
                            Editar Galería de Audio
                        </h3>

                        <div className="container mx-auto px-4 py-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                                {originalAudiosArray.current[0] == "" ? (
                                    <>
                                        <div className="col-span-full flex justify-center">
                                            <Image
                                                src={`/desert_plant.gif`}
                                                width={800}
                                                height={600}
                                                alt="Empty space"
                                                unoptimized
                                            />
                                        </div>
                                    </>
                                ) : (
                                    originalAudiosArray.current.map(
                                        (audio, index) => (
                                            <AudioCard
                                                key={"audio_card" + index}
                                                audio={audio}
                                                description={
                                                    originalAudiosDescriptionArray
                                                        .current[index]
                                                }
                                                id={index}
                                                handleAudioCard={
                                                    handleAudioCard
                                                }
                                                visibility={
                                                    formValues.audios_to_delete[
                                                        index
                                                    ] === "del"
                                                        ? ""
                                                        : "hidden"
                                                }
                                            />
                                        )
                                    )
                                )}
                            </div>
                        </div>
                        {/* Audio Input */}
                        <div className="space-y-2 my-8 border-b-2 border-slate-300 pb-10">
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
                            ></label>

                            <h3 className="text-2xl font-bold text-center">
                                Descripción y/o anotaciones
                            </h3>

                            <div className="mt-8">
                                {suite ? (
                                    <Suspense
                                        fallback={<div>Loading editor...</div>}
                                    >
                                        <MDXEditorWrapper
                                            prevMarkdown={suite.notes}
                                            setEditorContent={(markdown) =>
                                                setEditorContent(markdown)
                                            }
                                        />
                                    </Suspense>
                                ) : (
                                    <div>Loading Suite Data ...</div>
                                )}
                            </div>
                        </div>
                        <div>
                            {formState.errors._form ? (
                                <div className="p-2 mt-4 bg-red-200 border border-red-400 rounded">
                                    {formState.errors._form?.join(", ")}
                                </div>
                            ) : null}

                            <FormButton>Actualizar Obra</FormButton>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
