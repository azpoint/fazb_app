import { PrismaClient } from "@/generated/prisma"; // This path is crucial

/**
 * Global PrismaClient instance.
 * @type {PrismaClient}
 */
if (!global.prisma) {
	global.prisma = new PrismaClient();
}

export default global.prisma;