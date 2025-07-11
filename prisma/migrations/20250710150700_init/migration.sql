-- CreateTable
CREATE TABLE "Suite" (
    "suite_id" TEXT NOT NULL,
    "author_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "mov" TEXT,
    "composedInit" INTEGER NOT NULL,
    "composed" INTEGER NOT NULL,
    "rev" TIMESTAMP(3),
    "timeLength" TEXT,
    "edition" TEXT,
    "notes" TEXT,
    "images" TEXT,
    "audios" TEXT,
    "ytLinks" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "arrangement" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Suite_pkey" PRIMARY KEY ("suite_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "name" TEXT,
    "surname" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Confcode" (
    "code" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Suite_title_key" ON "Suite"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Suite_slug_key" ON "Suite"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_role_key" ON "User"("role");

-- CreateIndex
CREATE UNIQUE INDEX "Confcode_code_key" ON "Confcode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Confcode_email_key" ON "Confcode"("email");

-- AddForeignKey
ALTER TABLE "Suite" ADD CONSTRAINT "Suite_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
