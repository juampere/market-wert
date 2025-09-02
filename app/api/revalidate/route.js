// app/api/revalidate/route.js
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  revalidatePath('/') // Le decimos que revalide la página de inicio
  revalidatePath('/productos') // Y la de productos, por si acaso

  return NextResponse.json({ revalidated: true, now: Date.now() })
}