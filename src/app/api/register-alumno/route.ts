import { connectDB } from "../../../utils/mongoose"
import validateFields from "@/utils/validateFields";
import Alumno from "@/utils/models/Alumno";
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";
export const POST = async (request: Request) => {
    await connectDB();
    const data = await request.formData()
    console.log(data)
    const nombre = data.get("nombre");
    const correo = data.get("email");
    const password = data.get("password");
    const confirm_password = data.get("confirm_password");
    const telefono = data.get("telefono");
    const boleta = data.get("boleta");
    const carrera = data.get("carrera");
    const fields = { nombre, correo, password, confirm_password, telefono, boleta, carrera, status: 'pendiente' };

    const errores = await validateFields(fields);

    if (errores) {
        return NextResponse.json({ message: errores }, { status: 400 })
    }

    const salt = await bcrypt.genSalt(10);
    if (password !== null && password !== undefined && typeof password === 'string') {
        const hashedPassword = await bcrypt.hash(password, salt);
        fields.password = hashedPassword;
    }
    const alumno = new Alumno(fields);
    await alumno.save();

    return NextResponse.json({ message: "Se ha enviado el registro para su aprobación" }, { status: 200 })
};