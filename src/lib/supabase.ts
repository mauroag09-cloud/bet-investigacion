import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zwrdnhrtqkyvmuslelfm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3cmRuaHJ0cWt5dm11c2xlbGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5Nzc1MjgsImV4cCI6MjEwMTU1MzUyOH0.IL8tLTs4bwFRHynP5g2BSIkPcSg6tADUVLrBst8W7Vo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
