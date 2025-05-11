import { PrismaClient } from "@/generated/prisma";

if (!global.prisma) {
    global.prisma = new PrismaClient()
}

export default global.prisma