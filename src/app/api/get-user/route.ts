/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'
import Student from '@/utils/models/Student'
import Teacher from '@/utils/models/Teacher'
import Admin from '@/utils/models/Admin'
import { connectDB } from '@/utils/mongoose'
import objectToArray from '@/utils/objectToArray'
import setFriendlyKeys from '@/utils/setFriendlyNames'
interface CareerType {
  name: string
  _id: string
}

interface StudentDocument {
  [key: string]: any
  id: string
  email: string
  password: string
  name: string
  phone: string
  ticketNumber: string
  career: CareerType | string
  status: string
}
interface Projections {
  _id: number
  password: number
  id: number
  __v: number
  status: number
  documents: number
}
export async function GET (request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  console.log(searchParams)
  const isEdit = searchParams.get('edit')
  await connectDB()
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value
  console.log(token)
  if (!token) {
    return NextResponse.json({ message: 'Token expired' }, { status: 401 })
  }
  const decodedToken = jwt.decode(token)
  const role = decodedToken && typeof decodedToken === 'object' ? decodedToken.role : null
  const email = decodedToken && typeof decodedToken === 'object' ? decodedToken.email : null

  console.log(role)
  let user = null
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const projection = { _id: 0, password: 0, id: 0, __v: 0, status: 0 } as Projections
  if (role === 'student') {
    projection.documents = 0
    if (isEdit) {
      user = await Student.findOne({ email }, { phone: 1, email: 1, _id: 0 })

        .lean()
      return NextResponse.json(user, { status: 200 })
    } else {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      user = await Student.findOne({ email }, projection)
        .populate('career')
        .lean() as StudentDocument | null

      console.log(user)
      if (user && typeof user.career === 'object' && 'name' in user.career) {
        user.career = user.career.name
      }
      console.log(user)
    }
  }
  if (role === 'teacher') {
    user = await Teacher.findOne({ email }, projection).lean()
  }
  if (role === 'admin') {
    user = await Admin.findOne({ email }, projection).lean()
  }
  if (user) {
    const preprocessedUser: Record<string, any> = {}
    for (const key in user) {
      const value = (user as StudentDocument)[key as keyof StudentDocument]
      console.log(value)
      if (typeof value === 'object' && value !== null && 'name' in value) {
        preprocessedUser[key] = value.name
      } else {
        preprocessedUser[key] = value
      }
    }
    const userArray = objectToArray(preprocessedUser)

    const userWithFriendlyHeadings = setFriendlyKeys(userArray)

    return NextResponse.json(userWithFriendlyHeadings, { status: 200 })
  }
  return NextResponse.json({ message: 'User not found' }, { status: 404 })
}
