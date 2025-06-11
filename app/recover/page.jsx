import RecoverForm from "@/src/components/panel/forms/RecoverForm.jsx";

import prisma from "@/lib/prisma";

export default async function RecoverPage() {
    const mainUser = await prisma.user.findUnique({
        where: { role: "sysAdmin" },
        select: {
            email: true,
        },
    });
    
    return (
        <div className="flex-1 bg-slate-100 flex justify-center mt-[20vh]">
            <RecoverForm email={mainUser.email} />
        </div>
    );
}
