import { NextResponse } from 'next/server'
import Academy from '@/utils/models/Academy'
import validator from 'validator'
export async function POST (request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData()
    const name = formData.get('name')
    if (name === null || name === '') {
      return NextResponse.json({ message: 'El nombre es requerido' }, { status: 400 })
    } else if (!validator.isAlphanumeric(name as string, 'es-ES', { ignore: ' ' })) {
      return NextResponse.json({ message: 'El nombre debe de contener solo letras, números y espacios' }, { status: 400 })
    }
    const academy = new Academy({ name })
    await academy.save()
    return NextResponse.json({ message: `Academia ${(name as string)} agregada` })
  } catch (error) {
    return NextResponse.json({ message: 'Error al agregar la academia' }, { status: 500 })
  }
}
