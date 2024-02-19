import Student from '@/utils/models/Student'
import { connectDB } from '@/utils/mongoose'
import { NextResponse } from 'next/server'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
interface StudentDocument {
  id: string
  email: string
  password: string
  name: string
  phone: string
  ticketNumber: string
  career: string
  status: string
}
export async function POST (request: Request): Promise<NextResponse> {
  await connectDB()
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')
  console.log(email, password)
  if (email === null || password === null) {
    console.log('No email or password')
    return NextResponse.json({ message: 'Correo o contraseña incorrectos' }, { status: 400 })
  }
  if (!validator.isEmail(email as string)) {
    console.log('No valid email')
    return NextResponse.json({ message: 'Correo inválido' }, { status: 400 })
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const student = await Student.findOne({ email: email as string, status: 'active' }).lean() as StudentDocument | null
  if (student === null) {
    console.log('No student found')
    return NextResponse.json({ message: 'Correo o contraseña incorrectos' }, { status: 400 })
  }
  const match = await bcrypt.compare(password as string, student.password)

  if (!match) {
    console.log('No match')
    return NextResponse.json({ message: 'Correo o contraseña incorrectos' }, { status: 400 })
  }

  if (process.env.JWT_SECRET === undefined) {
    console.log('No JWT secret')
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
    id: student.id,
    email: student.email,
    name: student.name,
    role: 'student'
  }, process.env.JWT_SECRET, { algorithm: 'HS256' })

  const response = NextResponse.json({
    message: 'Inicio de sesión exitoso',
    success: true
  })

  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60,
    path: '/'
  })
  return response
}
