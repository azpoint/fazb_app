"use server";

//Modules
import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import util from "util";

//Dependencies
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import slugifyOptions from "@/lib/setup-options/slugify-options";
import slugify from "slugify";
import appPaths from "@/src/appPaths";

//Actions, Options, Validation Schemas
import { createSuiteZodSchema } from "@/lib/setup-options/zodSchemas/createSuiteZodSchema";

//DB
import prisma from "@/lib/prisma";

//-------- Definitions -------
//Convert a callback-based function into a promise-based function
const writeFileAsync = util.promisify(fs.writeFile);

export async function editSuite(_formState, formData) {
	//User load
	const user = await prisma.user.findUnique({
		where: { email: "franzapata2@gmail.com" },
	});

	//Find Suite
	const suite_id = formData.get("suite_id");
	const suite = await prisma.suite.findUnique({ where: { suite_id } });

	//--------- Form Validator ---------
	const zodResult = createSuiteZodSchema.safeParse({
		title: formData.get("title"),
		created: formData.get("created"),
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

	//-------- File Operations -------
	// -------- Image File Handling --------
	const imageFilePath = path.join("public", "suites", suite_id, "images");

	let imagePaths = [];
	let serverFileList = [];

	// Get photo filenames from server directory
	try {
		const dirents = await fsp.readdir(imageFilePath, {
			withFileTypes: true,
		});
		serverFileList = dirents
			.filter((dirent) => dirent.isFile())
			.map((dirent) => dirent.name);
	} catch (error) {
		throw new Error(
			`Error al leer el directorio de fotos: ${error.message}`
		);
	}

	//Delete photo promises
	if (serverFileList.length > 0) {
		const fileListToDeleteFromClient = JSON.parse(
			formData.get("images_to_delete")
		);
		const deletionPromises = fileListToDeleteFromClient.map(
			async (fileName) => {
				try {
					await fsp.unlink(path.join("public", fileName));
				} catch (error) {
					throw new Error(`Error eliminando archivo de imagen`);
				}
			}
		);
		await Promise.allSettled(deletionPromises);
	}

	//Sync server photo files with DB registered files
	let currentServerFileList = [];

	try {
		const dirents = await fsp.readdir(imageFilePath, {
			withFileTypes: true,
		});

		currentServerFileList = dirents
			.filter((dirent) => dirent.isFile())
			.map((dirent) => dirent.name);
	} catch (error) {
		throw new Error(`Error al leer el directorio fotos: ${error.message}`);
	}

	let fileListFromDB = JSON.parse(suite.images) ?? [""];

	if (fileListFromDB[0] !== "") {
		let imageFileListFromDB = fileListFromDB.map((item) =>
			item.filePath.split("/").slice(4).join("")
		);

		imageFileListFromDB.forEach((item, index) => {
			let fileData = {
				filePath: "",
				fileDescription: "",
			};
			if (currentServerFileList.includes(item)) {
				fileData.filePath = `/suites/${suite.suite_id}/images/${item}`;
				fileData.fileDescription = fileListFromDB[index];
				imagePaths.push(fileData);
			}
		});
	}

	//Check input files
	if (imageFiles.length !== 0) {
		try {
			// Check if directory exist and perform file handling
			if (fs.existsSync(path.resolve(imageFilePath))) {
				const writePromises = imageFiles.map(async (file) => {
					let fileData = {
						filePath: "",
						fileDescription: "",
					};

					if (
						file.type === "image/jpeg" ||
						file.type === "image/png"
					) {
						const bytes = await file.arrayBuffer();
						const buffer = Buffer.from(bytes);

						const imageName = `${uuidv4().slice(
							0,
							8
						)}-${user.name}_${user.surname}-${slugify(formData.get("title"), slugifyOptions)}.${file.type === "image/jpeg" ? "jpg" : "png"}`;

						await writeFileAsync(
							`${path.resolve(imageFilePath)}/${imageName}`,
							buffer
						);

						fileData.filePath = `/suites/${suite.suite_id}/images/${imageName}`;
						fileData.fileDescription = file.name.slice(0, -4);
						imagePaths.push(fileData);
					}
				});

				await Promise.all(writePromises);
			} else {
				throw new Error("Directorio de la suite inexistente");
			}
		} catch (error) {
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
	const audioFilePath = path.join("public", "suites", suite_id, "audios");

	let audioPaths = [];
	let serverAudioFileList = [];

	// Get audio filenames from directory
	try {
		const dirents = await fsp.readdir(audioFilePath, {
			withFileTypes: true,
		});
		serverAudioFileList = dirents
			.filter((dirent) => dirent.isFile())
			.map((dirent) => dirent.name);
	} catch (error) {
		throw new Error(
			`Error al leer el directorio de audio: ${error.message}`
		);
	}

	// Delete audio promises
	if (serverAudioFileList.length > 0) {
		const fileAudioListToDeleteFromClient = JSON.parse(
			formData.get("audios_to_delete")
		);

		const audioDeletionPromises = fileAudioListToDeleteFromClient.map(
			async (fileName) => {
				try {
					await fsp.unlink(path.join("public", fileName));
				} catch (error) {
					throw new Error(`Error eliminando archivo de imagen`);
				}
			}
		);
		await Promise.allSettled(audioDeletionPromises);
	}

	//Sync server audio files with DB registered files
	let currentAudioServerFileList = [];

	try {
		const dirents = await fsp.readdir(audioFilePath, {
			withFileTypes: true,
		});

		currentAudioServerFileList = dirents
			.filter((dirent) => dirent.isFile())
			.map((dirent) => dirent.name);
	} catch (error) {
		throw new Error(
			`Error al leer el directorio de audio: ${error.message}`
		);
	}

	let audioFileListFromDB = JSON.parse(suite.audios) ?? [""];

	if (audioFileListFromDB[0] !== "") {
		audioFileListFromDB = audioFileListFromDB.map((item) =>
			item.filePath.split("/").slice(4).join("")
		);

		audioFileListFromDB.forEach((item, index) => {
			let fileData = {
				filePath: "",
				fileDescription: "",
			};
			if (currentAudioServerFileList.includes(item)) {
				fileData.filePath = `/suites/${suite.suite_id}/audios/${item}`;
				fileData.fileDescription = JSON.parse(suite.audios)[index].fileDescription;
				audioPaths.push(fileData);
			}
		});
	}

	if (audioFiles.length !== 0) {
		try {
			//Check if directory exist and creates it if not
			if (fs.existsSync(path.resolve(audioFilePath))) {
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
						)}-${user.name}${user.surname}-${slugify(file.name.slice(0, -4), slugifyOptions)}.mp3`

						await writeFileAsync(
							`${path.resolve(audioFilePath)}/${audioName}`,
							buffer
						);

						fileData.filePath = `/suites/${suite.suite_id}/audios/${audioName}`;
						fileData.fileDescription = file.name.slice(0, -4);
						audioPaths.push(fileData);
					}
				});
				await Promise.all(writePromises);
			} else {
				throw new Error("Directorio de la suite inexistente");
			}
		} catch (error) {
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

	//------- DDBB Edit -------

	try {
		await prisma.suite.update({
			where: { suite_id: suite_id },
			data: {
				author: { connect: { user_id: user.user_id } },
				type: formData.get("type"),
				title: formData.get("title"),
				slug: slugify(formData.get("title"), slugifyOptions),
				mov: movs.length === 0 ? null : JSON.stringify(movs),
				created: formData.get("created"),
				rev: formData.get("rev") === "" ? null : formData.get("rev"),
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
						? suite.description
						: formData.get("description"),
				images:
					imagePaths.length === 0 ? null : JSON.stringify(imagePaths),
				audios:
					audioPaths.length === 0 ? null : JSON.stringify(audioPaths),
				ytLinks: ytIds.length === 0 ? null : JSON.stringify(ytIds),
			},
		});
		// Redirect must be outside of the try catch because redirect is handled like an error
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
	revalidatePath("/suites");
	revalidatePath("/panel");
	redirect(appPaths.mainPanel());
}
