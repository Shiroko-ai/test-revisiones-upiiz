import { connectDB } from '../../../utils/mongoose'
import validateFields from '@/utils/validateFields'
import Alumno from '@/utils/models/Student'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'
export const POST = async (request: Request): Promise<NextResponse> => {
  await connectDB()
  const data = await request.formData()
  console.log(data)
  const fields = {
    nombre: data.get('nombre'),
    correo: data.get('email'),
    password: data.get('password'),
    confirm_password: data.get('confirm_password'),
    telefono: data.get('telefono'),
    boleta: data.get('boleta'),
    carrera: data.get('carrera')
  }

  const errores = await validateFields(fields)

  if (errores !== null) {
    return NextResponse.json({ message: errores }, { status: 400 })
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
}
