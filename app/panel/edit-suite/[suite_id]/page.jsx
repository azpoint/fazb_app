import EditSuiteForm from "@/src/components/panel/forms/EditSuitesForm";
import prisma from "@/lib/prisma";

export const metadata = {
	title: "Editar Obra",
	description: "Fracisco Zapata Augusto Bello, compositor, director y vida",
};

export default async function EditSuitePage({ params }) {
    const { suite_id } = await params;
    const suite = await prisma.suite.findUnique({
        where: { suite_id },
    });
    return (
        <>
            <EditSuiteForm suite={suite} />
        </>
    );
}
