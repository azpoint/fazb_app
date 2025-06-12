import NewSuiteForm from "@/src/components/panel/forms/NewSuitesForm";

export const metadata = {
	title: "Nueva Obra",
	description: "Fracisco Zapata Augusto Bello, compositor, director y vida",
};

export default function NewSuitePage() {
	return (
		<>
			<NewSuiteForm />
		</>
	);
}