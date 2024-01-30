import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

const connect = async () => {
  try {
    prisma.$connect();
  } catch (error) {
    return Error("Database connection failed");
  }
};

export async function POST(request: NextRequest) {
  try {
    const { locationName, lat, lng, owner } = await request.json();
    await connect();
    const newFavorite = await prisma.favorite_Location.create({
      data: {
        locationName: locationName,
        latitude: lat,
        longitude: lng,
        createdAt: new Date(),
        owner: owner,
      },
    });
    return NextResponse.json(
      { message: "successfully added", data: newFavorite },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ messeage: "adding failed" }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
}
