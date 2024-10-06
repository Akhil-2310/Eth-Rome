import { createClient } from "@supabase/supabase-js";

// Supabase environment variables
const supabaseUrl = "https://sgpgshgwgnshbtdjoxrg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNncGdzaGd3Z25zaGJ0ZGpveHJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgxODgwNDIsImV4cCI6MjA0Mzc2NDA0Mn0.iq2jTrwyD6055QMpvxDukDbRmOAax-rvehuJFGor_5w";

export const supabase = createClient(supabaseUrl, supabaseKey);
