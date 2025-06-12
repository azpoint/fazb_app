-- CreateTable
CREATE TABLE "Confcode" (
    "code" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Confcode_code_key" ON "Confcode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Confcode_email_key" ON "Confcode"("email");
