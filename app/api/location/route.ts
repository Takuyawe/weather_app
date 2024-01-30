import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const lat = params.get("lat");
  const lng = params.get("lng");
  const url = `${process.env.HEARTRAILS_URL}&x=${lng}&y=${lat}`;
  const response = await axios.get(url);
  const data = response.data;
  return NextResponse.json(data);
}
