import EditSuiteForm from "@/src/components/panel/forms/EditSuitesForm";
import prisma from "@/lib/prisma";

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
