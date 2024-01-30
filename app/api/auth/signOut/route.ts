import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import dotenv from "dotenv";

dotenv.config();

export async function GET(request: NextRequest) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_API_KEY;

  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { error } = await supabase.auth.signOut();

    if (error) {
      return NextResponse.json(error.message);
    } else {
      return NextResponse.json({ success: true });
    }
  }
}
