-- CreateTable
CREATE TABLE "Favorite_Location" (
    "id" SERIAL NOT NULL,
    "location_name" TEXT NOT NULL,
    "latitude" INTEGER NOT NULL,
    "longitude" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "owner" TEXT NOT NULL,

    CONSTRAINT "Favorite_Location_pkey" PRIMARY KEY ("id")
);
