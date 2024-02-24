import Teacher from '@/utils/models/Teacher'
import { connectDB } from '@/utils/mongoose'
import validateFields from '@/utils/validateFields'
import { NextResponse } from 'next/server'
import Academy from '@/utils/models/Academy'
export async function POST (request: Request): Promise<NextResponse> {
  await connectDB()
  try {
    const data = await request.formData()
    const fields = {
      name: data.get('name'),
      employeeNumber: data.get('employeeNumber'),
      institutionalEmail: data.get('institutionalEmail'),
      email: data.get('email'),
      password: data.get('password'),
      confirmPassword: data.get('confirmPassword'),
      phone: data.get('phone'),
      academy: data.get('academy')
    }
    console.log(fields)
    const errors = await validateFields(fields, 'TEACHER')
    if (errors !== null && errors !== undefined) {
      console.log(errors)
      return NextResponse.json({ message: errors }, { status: 400 })
    }
    const teacher = new Teacher(fields)
    await teacher.save()
    await Academy.findOneAndUpdate({ _id: fields.academy }, { $push: { teachers: teacher._id } })
    return NextResponse.json({ message: 'Se ha enviado el registro para su aprobación' }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 })
  }
}
