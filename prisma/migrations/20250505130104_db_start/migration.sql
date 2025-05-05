-- CreateTable
CREATE TABLE "Suite" (
    "id" TEXT NOT NULL,
    "author_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "mov" TEXT,
    "created" TIMESTAMP(3) NOT NULL,
    "rev" TIMESTAMP(3),
    "timeLength" TEXT,
    "edition" TEXT,
    "notes" TEXT,
    "images" TEXT,
    "audios" TEXT,
    "ytLinks" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Suite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Suite_title_key" ON "Suite"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Suite_slug_key" ON "Suite"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Suite" ADD CONSTRAINT "Suite_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
