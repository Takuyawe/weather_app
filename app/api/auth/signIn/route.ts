import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import dotenv from "dotenv";

dotenv.config();

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const email = params.get("email");
  const password = params.get("password");

  if (!email || !password)
    return NextResponse.json({ error: "Invalid email or password" });

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_API_KEY;

  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (data.user) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ error: "Supabase credentials not found" });
    }
  }
}
