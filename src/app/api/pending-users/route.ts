import { connectDB } from "@/utils/mongoose";
import setFriendlyHeadings from "@/utils/setFriendlyHeadings"
import setKeys from "@/utils/setKeys"
import Alumno from "@/utils/models/Alumno";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
    await connectDB();
    const alumnos_pending = await Alumno.find({ status: 'pendiente' }, { password: 0, __v: 0, _id: 0 })
    const newData = setFriendlyHeadings(alumnos_pending);
    const dataWithKeys = setKeys(newData, 'Correo')
    console.log(newData)
    return NextResponse.json({ data: newData }, { status: 200 })
}
