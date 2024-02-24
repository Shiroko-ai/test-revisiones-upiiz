/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'
import Student from '@/utils/models/Student'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { connectDB } from '@/utils/mongoose'
export async function POST (request: Request): Promise<NextResponse> {
  try {
    await connectDB()
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value
    if (token === undefined) {
      return NextResponse.json({ message: 'No estás autorizado' }, { status: 401 })
    }
    const decodedToken = jwt.decode(token)
    const email = decodedToken && typeof decodedToken === 'object' ? decodedToken.email : null

    const formData = await request.formData()
    const file = formData.get('file') as File
    const name = formData.get('name') as string
    if (file === null) {
      return NextResponse.json({ message: 'No se encontró el archivo' }, { status: 400 })
    }
    const buffer = Buffer.from(await file.arrayBuffer())
    const dir = './public/tmp/'
    const storedDir = './tmp/'
    const dateNow = Date.now()
    const path = join(dir, dateNow + file.name)
    console.log(`Uploading file to ${path}`)
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true })
    }
    const storedpath = join(storedDir, dateNow + file.name)
    console.log(`Stored file in ${storedpath}`)
    await writeFile(path, buffer)
    await Student.updateOne({ email }, { $push: { documents: { name, path: storedpath } } })
    return NextResponse.json({ message: 'Archivo subido' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error al subir el archivo' }, { status: 500 })
  }
}
