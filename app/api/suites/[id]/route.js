import { NextResponse } from "next/server";
import { rm } from "fs/promises";
import path from "path";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function DELETE(_, { params }) {
	const { id: suite_id } = await params;

	let suitePath;

	if (process.env.NODE_ENV === "prod") {
		suitePath = path.resolve("/public_data", "suites", suite_id);
	} else {
		suitePath = path.resolve(
			process.cwd(),
			"public_data",
			"suites",
			suite_id
		);
	}

	try {
		await rm(suitePath, { recursive: true, force: true });

		await prisma.suite.delete({
			where: { suite_id },
		});

		revalidatePath("/admin/panel")
		revalidatePath("/suites")

		return NextResponse.json({ message: "Obra Eliminada Correctamente" }, { status: 200 })
	} catch (error) {
		console.error("Error eliminando la Obra:", error);
		return NextResponse.json({ message: "Error eliminando la Obra", error: error.message }, { status: 500 })
	}
}
