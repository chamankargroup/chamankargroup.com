import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://apljvusmsrcjsthufuvp.supabase.co'
const supabaseAnonKey = 'sb_publishable__Bv3F7XYEELALffXv8MwAg_H30pjBAg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
