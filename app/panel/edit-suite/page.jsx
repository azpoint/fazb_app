import { redirect } from "next/navigation";
import appPaths from "@/src/appPaths";

export default function NewSuitePage() {
	redirect(appPaths.mainPanel());
}
