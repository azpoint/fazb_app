import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { revalidatePath } from 'next/cache';

export async function PATCH(req, { params }) {
	const { id: suite_id } = await params

	const { published  } = await req.json()

	try {
		await prisma.suite.update({
			where: { suite_id },
			data: { published: !published  },
		});

		revalidatePath("/admin/panel");
		revalidatePath("/suites");

		return NextResponse.json({message: "La obra ahora está para el público"}, {status: 200})
	} catch (error) {
		return NextResponse.json({message: "Error al publicar la obra en web"}, {status: 500})
	}
}