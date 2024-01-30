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

export async function DELETE(request: NextRequest) {
  try {
    const { locationName, owner } = await request.json();
    await connect();
    const favorites = await prisma.favorite_Location.deleteMany({
      where: {
        locationName: locationName,
        owner: owner,
      },
    });
    return NextResponse.json(
      { message: "successfully added", data: favorites },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ messeage: "adding failed" }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
}
