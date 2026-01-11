
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.warn("Missing Supabase credentials in .env. Falling back to in-memory cache behavior (or failing).");
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
