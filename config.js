const {createClient} = supabase
const supabaseUrl = "https://pigknwkzqsjtmrayrrjd.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpZ2tud2t6cXNqdG1yYXlycmpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2Nzk2NjQsImV4cCI6MjA1MjI1NTY2NH0.BOHl_btnXhyhJdLjUPBYLfI7ySGgCOznFyZJr6nldr8"
const supabaseClient = createClient(supabaseUrl , supabaseKey)
window.supabase = supabaseClient
