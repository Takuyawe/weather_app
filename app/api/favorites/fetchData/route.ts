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

export async function GET(request: NextRequest) {
  try {
    const owner = request.nextUrl.searchParams.get("owner");
    if (!owner)
      return NextResponse.json(
        { message: "owner not provided" },
        { status: 400 }
      );
    await connect();
    const favorites = await prisma.favorite_Location.findMany({
      where: {
        owner: owner,
      },
    });
    return NextResponse.json({ favorites }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ messeage: "fetching failed" }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
}
