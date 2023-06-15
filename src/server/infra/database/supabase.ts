import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseApiKey = process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY || "";
export const supabase = createClient(supabaseUrl, supabaseApiKey);
