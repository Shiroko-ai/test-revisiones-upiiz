import { connectDB } from '@/utils/mongoose'
import setFriendlyHeadings from '@/utils/setFriendlyHeadings'
import Student from '@/utils/models/Student'
import { NextResponse } from 'next/server'
import Teacher from '@/utils/models/Teacher'
export async function GET (request: Request): Promise<NextResponse> {
  try {
    await connectDB()
    const pendingStudents: Array<Record<string, any>> = await Student.find({ status: 'pending' }, { password: 0, __v: 0, _id: 0 }).lean().populate('career')
    const filteredStudents = pendingStudents.map(student => {
      return {
        ...student,
        career: student.career.name,
        status: 'Pendiente'
      }
    })
    console.log(filteredStudents)
    const newData = setFriendlyHeadings(filteredStudents)
    console.log(newData)
    return NextResponse.json(newData, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}

export async function POST (request: Request): Promise<NextResponse> {
  try {
    await connectDB()
    const { id } = await request.json()

    const [student, teacher] = await Promise.all([
      Student.findOne({ id }).lean().exec(),
      Teacher.findOne({ id }).lean().exec()
    ])
    if (student === undefined && teacher === undefined) {
      return NextResponse.json({ message: 'El usuario no existe o ha sido de alta previamente' }, { status: 404 })
    }
    if (student !== undefined) {
      await Student.updateOne({ id }, { status: 'active' })
    } else if (teacher !== undefined) {
      await Teacher.updateOne({ id }, { status: 'active' })
    }
    return NextResponse.json({ message: 'El usuario ha sido dado de alta satisfactoriamente' }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}
