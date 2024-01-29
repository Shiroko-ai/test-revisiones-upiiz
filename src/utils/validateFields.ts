import Alumno from "./models/Alumno"
import validator from 'validator'
type FormData = {
    nombre: string | null;
    correo: string | null;
    password: string | null;
    confirm_password: string | null;
    telefono: string | null;
    boleta: string | null;
    carrera: string | null;
};
const friendlyNames: Record<keyof FormData, string> = {
    nombre: "Nombre",
    correo: "Correo electrónico",
    password: "Contraseña",
    confirm_password: "Confirmar contraseña",
    telefono: "Telefono",
    boleta: "Boleta",
    carrera: "Carrera",
};
export default async function validateFields(fields: Record<string, unknown>): Promise<string | null> {
    const errors: string[] = []
    let first_void_name: Boolean = false
    for (const field in fields) {
        if (fields[field] === null || fields[field] === '' || fields[field] === undefined) {
            if (first_void_name === false) {
                errors.push('Los siguientes campos deben ser llenados:' + friendlyNames[field as keyof FormData])
                first_void_name = true
            }
            else {
                errors.push(friendlyNames[field as keyof FormData]);
            }
        }
    }
    if (errors.length > 0) {
        return errors.join(', ')
    }
    if (fields['password'] !== fields['confirm_password']) {
        errors.push('las contraseñas no coinciden')
    }
    if (!validator.isEmail(fields['correo'] as string)) {
        errors.push('El correo no es valido')
    }
    if (!validator.isMobilePhone(fields['telefono'] as string)) {
        errors.push('El telefono no es valido')
    }
    if (!validator.isNumeric(fields['boleta'] as string)) {
        errors.push('La boleta no es valida')
    }
    if (!validator.matches(fields['nombre'] as string, /^[a-zA-Z\u00C0-\u00FF. ]+$/)) {
        errors.push('El nombre solo debe contener letras o espacios')
    }
    const correo_repetido = await Alumno.findOne({ correo: fields['correo'] })
    if (correo_repetido) {
        errors.push('El correo ya existe')
    }
    const boleta_repetida = await Alumno.findOne({ boleta: fields['boleta'] })
    if (boleta_repetida) {
        errors.push('La boleta ya existe')
    }
    if (errors.length === 0) return null
    return errors.join(', ')
}