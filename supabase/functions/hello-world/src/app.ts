
import { Hono, Context } from 'jsr:@hono/hono'
import { fetchProducts } from "./query.ts";

const functionName = 'hello-world'
const app = new Hono().basePath(`/${functionName}`)

app.get('/hello', (c: Context) => c.text('Hello from hono-server!'))

app.get('/products', async (c: Context) => {
  return c.json(await fetchProducts())
})

app.onError((err, c) => {
  console.error(`${err}`)
  return c.text('Custom Error Message', 500)
})

export default app
