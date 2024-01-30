/*
  Warnings:

  - You are about to drop the column `created_at` on the `Favorite_Location` table. All the data in the column will be lost.
  - You are about to drop the column `location_name` on the `Favorite_Location` table. All the data in the column will be lost.
  - Added the required column `locationName` to the `Favorite_Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Favorite_Location" DROP COLUMN "created_at",
DROP COLUMN "location_name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "locationName" TEXT NOT NULL;
