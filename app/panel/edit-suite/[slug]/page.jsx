import EditSuiteForm from "@/src/components/panel/forms/EditSuitesForm";
import prisma from "@/lib/prisma";

export default async function EditSuitePage({ params }) {
	const { slug } = await params;
	const suite = await prisma.suite.findUnique({
		where: { suite_id: slug },
	});
	// console.log(suite)
	return (
		<>
			<EditSuiteForm suite={suite} />
		</>
	);
}
