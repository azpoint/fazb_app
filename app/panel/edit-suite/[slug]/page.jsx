import EditSuiteForm from "@/src/components/panel/forms/EditSuitesForm";
import prisma from "@/lib/prisma";

export default async function EditSuitePage({ params }) {
    const suite = await prisma.suite.findUnique({ where: { slug: params.slug } });
    return (
        <>
            <EditSuiteForm suite={suite}/>
        </>
    );
}