import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://abmvtscjltfxsbkhpqhg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFibXZ0c2NqbHRmeHNia2hwcWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkzMTU1MTUsImV4cCI6MjAzNDg5MTUxNX0.wxWYZhDAt4t8OgdxjrIeJr48nZzAeTrZ8oF36_EFZj4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
