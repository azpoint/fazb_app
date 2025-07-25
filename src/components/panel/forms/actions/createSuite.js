"use server";

//Modules
import fs from "fs";
import path from "path";
import util from "util";

//Dependencies
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import slugify from "slugify";
import appPaths from "@/src/appPaths";

//Actions, Options, Validation Schemas
import { createSuiteZodSchema } from "@/lib/setup-options/zodSchemas/createSuiteZodSchema";
import slugifyOptions from "@/lib/setup-options/slugify-options";

//DB
import prisma from "@/lib/prisma";
import { getUserFromSession } from "@/lib/auth";

//-------- Definitions -------
//Convert a callback-based function into a promise-based function
const writeFileAsync = util.promisify(fs.writeFile);

export async function createSuite(_formState, formData) {
    //--------- Form Validator ---------
    const zodResult = createSuiteZodSchema.safeParse({
        title: formData.get("title"),
        composedInit: formData.get("composedInit") === "" ? null : formData.get("composedInit"),
        composed: formData.get("composed"),
        rev: formData.get("rev") === "" ? null : formData.get("rev"),
        _length:
            formData.get("_length") === "" ? null : formData.get("_length"),
        edition: formData.get("edition"),
    });

    if (!zodResult.success) {
        return {
            errors: zodResult.error.flatten().fieldErrors,
        };
    }

    //------- Images Validator --------
    const imageFiles = formData.getAll("images");

    if (imageFiles[0]?.size > 0) {
        const imageVal = imageFiles.every((file) => {
            return file.type === "image/jpeg" || file.type === "image/png";
        });

        if (!imageVal) {
            return {
                errors: {
                    images: ["Sólo puedes subir imágenes JPG y PNG"],
                },
            };
        }
    }

    //------- Audios Validator --------
    const audioFiles = formData.getAll("audios");

    if (audioFiles[0]?.size > 0) {
        const audioVal = audioFiles.every((file) => {
            return file.type === "audio/mpeg";
        });

        if (!audioVal) {
            return {
                errors: {
                    audios: ["Sólo puedes subir audios mp3"],
                },
            };
        }
    }

    //-------- Mov list Validator -------
    let movs = [];
    const movList = formData.getAll("mov");
    let movErrorList = new Array(movList.length);

    movList.forEach((mov, index) => {
        if (!mov || [...mov].length < 4 || [...mov].length > 80) {
            movErrorList[index] = "Más de 3 y menos de 80 caracteres";
        }
        movs.push(mov);
    });

    let findMovError = movErrorList.findIndex(
        (mov) => mov === "Más de 3 y menos de 80 caracteres"
    );

    if (findMovError !== -1) {
        return {
            errors: {
                mov: movErrorList,
            },
        };
    }

    //-------- Youtube Link Validator --------
    let ytIds = [];
    const ytLinkList = formData.getAll("youtube_l");
    let ytLinkErrorsList = new Array(ytLinkList.length);

    ytLinkList.forEach((link, index) => {
        if (link === "" && ytLinkList.length === 1) {
            ytIds = [];
        } else if (/www.youtube.com\/watch\?v=([^&]+)/.test(link)) {
            ytIds.push(link.match(/watch\?v=([^&]+)/)[1]);
        } else if (/youtu.be\/([^/]+)$/.test(link)) {
            ytIds.push(link.match(/.be\/([^/]+)$/)[1]);
        } else {
            ytLinkErrorsList[index] = "Link Incorrecto ó vacío";
        }
    });

    let findLinkError = ytLinkErrorsList.findIndex(
        (link) => link === "Link Incorrecto ó vacío"
    );

    if (findLinkError !== -1) {
        return {
            errors: {
                youtube_l: ytLinkErrorsList,
            },
        };
    }

    //-------- Image File Handler --------
    let suite_id = uuidv4().slice(0, 8);
    let imagePaths = [];

    //User load
    const userSession = await getUserFromSession();

    const user = await prisma.user.findFirst({
        where: {
            email: userSession.user,
        },
    });

    if (imageFiles.length !== 0) {
        try {
            let imageFilePath;

            if (process.env.NODE_ENV === "prod") {
                imageFilePath = path.join(
                    "/public_data",
                    "suites",
                    suite_id,
                    "images"
                );
            } else {
                imageFilePath = path.join(
                    "public_data",
                    "suites",
                    suite_id,
                    "images"
                );
            }

            //Check if directory exist and creates it if not
            if (!fs.existsSync(path.resolve(imageFilePath))) {
                fs.mkdirSync(path.resolve(imageFilePath), { recursive: true });
            }

            const writePromises = imageFiles.map(async (file) => {
                let fileData = {
                    filePath: "",
                    fileDescription: "",
                };

                if (file.type === "image/jpeg" || file.type === "image/png") {
                    const bytes = await file.arrayBuffer();
                    const buffer = Buffer.from(bytes);

                    const imageName = `${uuidv4().slice(
                        0,
                        8
                    )}-${user.name.toLowerCase()}_${user.surname.toLowerCase()}-${slugify(formData.get("title"), slugifyOptions)}.${file.type === "image/jpeg" ? "jpg" : "png"}`;

                    await writeFileAsync(
                        `${path.resolve(imageFilePath)}/${imageName}`,
                        buffer
                    );

                    fileData.filePath = `/public_data/suites/${suite_id}/images/${imageName}`;
                    fileData.fileDescription = file.name.slice(0, -4);
                    imagePaths.push(fileData);
                }
            });

            await Promise.all(writePromises);

            // Redirect must be outside of the try catch because redirect is handled like an error
            // redirect('/panel')
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                return {
                    errors: {
                        _form: [error.message],
                    },
                };
            } else {
                return {
                    message: "Algo salió mal con las imágenes",
                };
            }
        }
    }

    //-------- Audio file server handler --------
    let audioPaths = [];

    if (audioFiles.length !== 0) {
        try {
            let audioFilePath;

            if (process.env.NODE_ENV === "prod") {
                audioFilePath = path.join(
                    "/public_data",
                    "suites",
                    suite_id,
                    "audios"
                );
            } else {
                audioFilePath = path.join(
                    "public_data",
                    "suites",
                    suite_id,
                    "audios"
                );
            }

            //Check if directory exist and creates it if not
            if (!fs.existsSync(path.resolve(audioFilePath))) {
                fs.mkdirSync(path.resolve(audioFilePath), { recursive: true });
            }

            const writePromises = audioFiles.map(async (file) => {
                let fileData = {
                    filePath: "",
                    fileDescription: "",
                };

                if (file.type === "audio/mpeg") {
                    const bytes = await file.arrayBuffer();
                    const buffer = Buffer.from(bytes);

                    const audioName = `${uuidv4().slice(
                        0,
                        8
                    )}-${user.name.toLowerCase()}_${user.surname.toLowerCase()}-${slugify(file.name.slice(0, -4), slugifyOptions)}.mp3`;

                    await writeFileAsync(
                        `${path.resolve(audioFilePath)}/${audioName}`,
                        buffer
                    );

                    fileData.filePath = `/public_data/suites/${suite_id}/audios/${audioName}`;
                    fileData.fileDescription = file.name.slice(0, -4);
                    audioPaths.push(fileData);
                }
            });

            await Promise.all(writePromises);
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                return {
                    errors: {
                        _form: [error.message],
                    },
                };
            } else {
                return {
                    message: "Algo salió mal con los audios",
                };
            }
        }
    }

    let suiteDbCreated;
    //------- DDBB Create -------

    try {
        suiteDbCreated = await prisma.suite.create({
            data: {
                suite_id: suite_id,
                author: { connect: { user_id: user.user_id } },
                type: formData.get("type"),
                title: formData.get("title"),
                slug: slugify(formData.get("title"), slugifyOptions),
                mov: movs.length === 0 ? null : JSON.stringify(movs),
                composedInit:
                    formData.get("composedInit") === ""
                        ? null
                        : parseInt(formData.get("composedInit")),
                composed: parseInt(formData.get("composed"), 10),
                rev: formData.get("rev") === "" ? null : parseInt(formData.get("rev")),
                timeLength:
                    formData.get("_length") === ""
                        ? null
                        : formData.get("_length"),
                edition:
                    formData.get("edition") === ""
                        ? null
                        : formData.get("edition"),
                notes:
                    formData.get("description") === ""
                        ? null
                        : formData.get("description"),
                images:
                    imagePaths.length === 0 ? null : JSON.stringify(imagePaths),
                audios:
                    audioPaths.length === 0 ? null : JSON.stringify(audioPaths),
                ytLinks: ytIds.length === 0 ? null : JSON.stringify(ytIds),
                arrangement: Boolean(formData.get("isArrangement")),
            },
        });

        //Redirect must be outside of the try catch because redirect is handled like an error
    } catch (error) {
        if (error instanceof Error) {
            if (error.code === "P2002") {
                return {
                    errors: {
                        _form: ["Esta obra ya existe!"],
                    },
                };
            }
            return {
                errors: {
                    _form: [error.message],
                },
            };
        } else {
            return {
                errors: {
                    _form: ["Algo salió mal con la Base de Datos"],
                },
            };
        }
    }

    // Update static pages on the server at the path in production mode.
    if (suiteDbCreated) {
        revalidatePath("/suites");
        revalidatePath("/panel");
        redirect(appPaths.editSuite(suiteDbCreated.suite_id));
    } else {
        return {
            errors: {
                _form: ["Error inesperado: suite no fue creada."],
            },
        };
    }
}
