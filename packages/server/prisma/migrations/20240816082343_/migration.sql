-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "roleId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Music" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "uploaderId" INTEGER NOT NULL,
    "fileId" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Music_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Playlist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL DEFAULT false,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "intact" BOOLEAN NOT NULL DEFAULT false,
    "path" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "public" BOOLEAN NOT NULL DEFAULT true,
    "ownerId" INTEGER NOT NULL,
    "playlistId" TEXT NOT NULL,
    "lastActive" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Preference" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Preference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlaylistOfMusic" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_roleId_key" ON "User"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Music_uploaderId_key" ON "Music"("uploaderId");

-- CreateIndex
CREATE UNIQUE INDEX "Music_fileId_key" ON "Music"("fileId");

-- CreateIndex
CREATE UNIQUE INDEX "Playlist_ownerId_key" ON "Playlist"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "Room_ownerId_key" ON "Room"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "Room_playlistId_key" ON "Room"("playlistId");

-- CreateIndex
CREATE UNIQUE INDEX "Preference_userId_key" ON "Preference"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_PlaylistOfMusic_AB_unique" ON "_PlaylistOfMusic"("A", "B");

-- CreateIndex
CREATE INDEX "_PlaylistOfMusic_B_index" ON "_PlaylistOfMusic"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Music" ADD CONSTRAINT "Music_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Music" ADD CONSTRAINT "Music_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preference" ADD CONSTRAINT "Preference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistOfMusic" ADD CONSTRAINT "_PlaylistOfMusic_A_fkey" FOREIGN KEY ("A") REFERENCES "Music"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistOfMusic" ADD CONSTRAINT "_PlaylistOfMusic_B_fkey" FOREIGN KEY ("B") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
