import { createClient } from '@supabase/supabase-js'
import { Hono, Context } from 'jsr:@hono/hono'

// change this to your function name
const functionName = 'hello-world'
const app = new Hono().basePath(`/${functionName}`)

app.get('/hello', (c: Context) => c.text('Hello from hono-server!'))

app.get('/products', async (c: Context) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )
  const { data, error } = await supabase.from('products').select('*')
  if (error) {
    return c.json({ error: error.message }, 500)
  }
  return c.json(data)
})

app.onError((err, c) => {
  console.error(`${err}`)
  return c.text('Custom Error Message', 500)
})

Deno.serve(app.fetch)