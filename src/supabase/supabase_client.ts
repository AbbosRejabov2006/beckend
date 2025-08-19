import { createClient } from "@supabase/supabase-js"

// .env fayldan olamiz
const supabaseUrl = "https://jdptqhzyovkbusyfnsxl.supabase.co"
const supabaseKey = "sb_secret_XiZuwMKgC5u5W3v8yn-_-g_TVkDc_DW"
export const supabase = createClient(supabaseUrl, supabaseKey)
