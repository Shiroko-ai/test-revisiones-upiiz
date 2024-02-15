import { NextResponse } from 'next/server'
import Carreer from '@/utils/models/Career'
import validator from 'validator'
import { connectDB } from '@/utils/mongoose'
export async function POST (request: Request): Promise<NextResponse> {
  await connectDB()
  const data = await request.formData()
  const name = data.get('name') as string

  if (!validator.isAlphanumeric(name, 'es-ES', { ignore: ' ' }) || name.length < 3 || name.length > 50 || name === undefined || name === null) {
    return NextResponse.json({ message: 'Nombre inválido, debe de tener al menos 3 caracteres y menos de 50, no contener espacios y solo letras y números' }, { status: 400 })
  }
  const existingCareers = await Carreer.findOne({ name }).lean()
  if (existingCareers !== null) {
    return NextResponse.json({ message: 'La carrera que estás intentando agregar ya existe' }, { status: 400 })
  }
  const career = new Carreer({ name })
  await career.save()
  return NextResponse.json({ message: 'Carrera agregada' })
}

export async function GET (): Promise<NextResponse> {
  await connectDB()
  const careers = await Carreer.find().lean()
  console.log(careers)
  return NextResponse.json(careers)
}
