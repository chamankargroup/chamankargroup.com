import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://apljvusmsrcjsthufuvp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwbGp2dXNtc3JjanN0aHVmdXZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzMzQyNjIsImV4cCI6MjA1MzkxMDI2Mn0.Ay93JDegJ-L8gz2QLsNm8m3pxXNFLO0dgnUhvzIGS5s'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
