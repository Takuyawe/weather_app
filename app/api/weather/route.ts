import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const lat = params.get("lat");
  const lng = params.get("lng");
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lng}&appid=${process.env.WEATHER_API_KEY}`;
  const result = await axios.get(url);
  return NextResponse.json(result.data);
}
