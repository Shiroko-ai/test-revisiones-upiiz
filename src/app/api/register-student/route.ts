import { connectDB } from '../../../utils/mongoose'
import validateFields from '@/utils/validateFields'
import Alumno from '@/utils/models/Student'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'
export const POST = async (request: Request): Promise<NextResponse> => {
  try {
    await connectDB()
    const data = await request.formData()
    console.log(data)
    const fields = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      confirmPassword: data.get('confirmPassword'),
      phone: data.get('phone'),
      ticketNumber: data.get('ticketNumber'),
      career: data.get('career'),
      status: 'pending'
    }

    const errors = await validateFields(fields, 'STUDENT')

    if (errors !== null) {
      return NextResponse.json({ message: errors }, { status: 400 })
    } else {
      const salt = await bcrypt.genSalt(10)
      if (fields.password !== null && fields.password !== undefined && typeof fields.password === 'string') {
        const hashedPassword = await bcrypt.hash(fields.password, salt)
        fields.password = hashedPassword
      }
      const alumno = new Alumno(fields)
      await alumno.save()

      return NextResponse.json({ message: 'Se ha enviado el registro para su aprobación' }, { status: 200 })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 })
  }
}
