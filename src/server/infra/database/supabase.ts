import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseApiKey = process.env.SUPABASE_SECRET_KEY || "";
export const supabase = createClient(supabaseUrl, supabaseApiKey);
