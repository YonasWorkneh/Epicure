import Constants from "expo-constants";
import { createClient } from "@supabase/supabase-js";
// const supabaseUrl = Constants.manifest2.extra.supabaseUrl;
// const supabaseKey = Constants.manifest2.extra.supabaseKey;
const supabaseUrl = "https://erluvheqdwifiutaxruv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVybHV2aGVxZHdpZml1dGF4cnV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5MjE3NzQsImV4cCI6MjA1MDQ5Nzc3NH0.DVU1w37tLBYIg9qNroLkU1SaxSygmXCwKaHCxCMM4lI";

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
