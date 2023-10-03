import { createClient } from '@supabase/supabase-js';

const URL = import.meta.env.VITE_URL
const KEY = import.meta.env.VITE_KEY
const supabase = createClient(URL, KEY)
export default supabase;