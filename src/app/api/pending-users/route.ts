import { connectDB } from '@/utils/mongoose'
import setFriendlyHeadings from '@/utils/setFriendlyHeadings'
import Student from '@/utils/models/Student'
import { NextResponse } from 'next/server'
export async function GET (request: Request): Promise<NextResponse> {
  await connectDB()
  const pendingStudents: Array<Record<string, string>> = await Student.find({ status: 'pending' }, { password: 0, __v: 0, _id: 0 })
  const newData = setFriendlyHeadings(pendingStudents)
  console.log(newData)
  return NextResponse.json({ newData }, { status: 200 })
}
