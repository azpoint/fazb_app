import chalk from "chalk";
import prisma from "@/lib/prisma";
import { rm } from "fs/promises";
import path from "path";
import { redirect } from "next/navigation";
import appPaths from "@/src/appPaths";

export default async function DeleteSuitePage({ params }) {
    const { suite_id } = await params;
    const suite = await prisma.suite.findUnique({
        where: { suite_id: suite_id },
    });

    const suiteFilePath = path.join("public", "suites", suite.suite_id);

    // console.log(chalk.redBright.inverse(suiteFilePath));

    try {
        rm(suiteFilePath, { recursive: true, force: true });

        await prisma.suite.delete({
            where: { suite_id },
        });
    } catch (error) {
        throw new Error("Hubo un problema eliminando la obra");
    }

    redirect(appPaths.mainPanel());
}
