import { createClient, PostgrestError } from '@supabase/supabase-js'

export type Product = {
  id: number
  created_at: string
  name: string
  price: number
}

type Result = { data: Product[] | null; error: PostgrestError | null }

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

export async function fetchProducts(): Promise<{ data: Product[] }> {
  const { data, error }: Result = await supabase.from('products').select('*')
  if (error) {
    throw error
  }
  return { data: data as Product[] }
}