import prisma from "./prisma";
import { hash, compare } from "bcrypt";

/**
 * Retrieve user from DB
 * @param {string} email - email from user
 * @param {string} password - password from user
 * @returns {JSON} - User data
 */
export async function authenticateUser(email, password) {
	const user = await prisma.user.findUnique({
		where: { email },
	});

	if (user && (await compare(password, user.password))) {
		return {
			email: user.email,
			role: user.role,
		};
	} else {
		return null;
	}
}

/**
 *
 * @param {string} email
 * @param {string} password
 * @param {string} role - Required: sysAdmin or mainUser
 * @param {string} name
 * @param {string} surname
 * @returns {JSON} - User data
 */
export async function createUser(email, password, role, name, surname) {
	const passwordHash = await hash(password, 10);

	try {
		await prisma.user.create({
			data: {
				email,
				password: passwordHash,
				role,
				name: name === "" ? null : name,
				surname: surname === "" ? null : surname,
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			if (error.code === "P2002") {
				return {
					errors: {
						_form: ["Este Usuario ya existe"],
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
					_form: ["Algo salió mal con el registro de usuario"],
				},
			};
		}
	}
}

export async function updateUser(email, password) {
	const passwordHash = await hash(password, 10)

	try {
		await prisma.user.update({
			where: { email },
			data: {
				password: passwordHash
			}
		})

		return { success: true }
	} catch (error) {
		return {
			errors: {
				_form: ["Algo salió mal con el cambio de clave"],
			},
		};
	}
}
