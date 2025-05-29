-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('SINGLE', 'DOUBLE', 'SUITE');

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "roomNumber" VARCHAR(10) NOT NULL,
    "type" "RoomType" NOT NULL DEFAULT 'SINGLE',
    "pricePerNight" DOUBLE PRECISION NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "guestName" VARCHAR(100) NOT NULL,
    "checkInDate" TIMESTAMP(3) NOT NULL,
    "checkOutDate" TIMESTAMP(3) NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_roomNumber_key" ON "Room"("roomNumber");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
