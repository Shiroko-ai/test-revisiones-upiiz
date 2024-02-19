/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import Student from '@/utils/models/Student'
import Teacher from '@/utils/models/Teacher'
import Admin from '@/utils/models/Admin'
import { connectDB } from '@/utils/mongoose'
export async function POST (request: Request): Promise<NextResponse> {
  try {
    await connectDB()
    const formData = await request.formData()
    const emailInput = formData.get('email') as string
    const phone = formData.get('phone') as string
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value
    console.log(token)
    if (token === 'null' || token === 'undefined') {
      return NextResponse.json({ message: 'Token expired' }, { status: 401 })
    }
    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
    const decodedToken = jwt.decode(token as string)
    const role = decodedToken && typeof decodedToken === 'object' ? decodedToken.role : null
    const email = decodedToken && typeof decodedToken === 'object' ? decodedToken.email : null

    const repeatedEmail = await Promise.all([
      Student.findOne({ email: emailInput }).lean(),
      Teacher.findOne({ email: emailInput }).lean(),
      Admin.findOne({ email: emailInput }).lean()
    ])
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    if ((repeatedEmail[0] || repeatedEmail[1] || repeatedEmail[2]) && email !== emailInput) {
      return NextResponse.json({ message: 'El correo ya está en uso' }, { status: 400 })
    }
    if (role === 'student') {
      const student = await Student.findOneAndUpdate({ email }, { email: emailInput, phone }, { new: true }).lean()
      if (student) {
        return NextResponse.json({ message: 'Usuario actualizado' }, { status: 200 })
      }
    }
    if (role === 'teacher') {
      const teacher = await Teacher.findOneAndUpdate({ email }, { email: emailInput, phone }, { new: true }).lean()
      if (teacher) {
        return NextResponse.json({ message: 'Usuario actualizado' }, { status: 200 })
      }
    }
    if (role === 'admin') {
      const admin = await Admin.findOneAndUpdate({ email }, { email: emailInput, phone }, { new: true }).lean()
      if (admin) {
        return NextResponse.json({ message: 'Usuario actualizado' }, { status: 200 })
      }
    }

    console.log(role)
    return NextResponse.json({ message: 'El usuario no pudo ser actualizado' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error desconocido en el servidor' }, { status: 500 })
  }
}
