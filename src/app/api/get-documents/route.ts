/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import Student from '@/utils/models/Student'
export async function GET (request: Request): Promise<NextResponse> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value
    console.log(token)
    if (token === null || token === undefined) {
      return NextResponse.json({ message: 'Token expired' }, { status: 401 })
    }
    const decodedToken = jwt.decode(token)
    const email = decodedToken && typeof decodedToken === 'object' ? decodedToken.email : null
    console.log(email)

    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
    const StudentDocuments = await Student.findOne({ email }, { documents: 1, _id: 0 }).lean() as Record<string, unknown>
    const documents = StudentDocuments.documents as Array<Record<string, unknown>>
    documents.forEach(document => {
      delete document._id
    })
    console.log(StudentDocuments)
    return NextResponse.json(StudentDocuments, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error desconocido en el servidor' }, { status: 500 })
  }
}
