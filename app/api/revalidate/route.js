// app/api/revalidate/route.js
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  // Verificamos que la "llave secreta" sea la correcta
  if (secret !== process.env.NEXT_PUBLIC_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  // Le decimos a Vercel que actualice la caché de estas páginas
  revalidatePath('/')
  revalidatePath('/productos')

  return NextResponse.json({ revalidated: true, now: Date.now() })
}