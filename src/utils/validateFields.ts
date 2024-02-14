import Student from './models/Student'
import Carreer from './models/Carreer'
import validator from 'validator'
import Teacher from './models/Teacher'
interface FormData {
  nombre: string | null
  correo: string | null
  password: string | null
  confirm_password: string | null
  telefono: string | null
  boleta: string | null
  carrera: string | null
}
const friendlyNames: Record<keyof FormData, string> = {
  nombre: 'Nombre',
  correo: 'Correo electrónico',
  password: 'Contraseña',
  confirm_password: 'Confirmar contraseña',
  telefono: 'Telefono',
  boleta: 'Boleta',
  carrera: 'Carrera'
}
export default async function validateFields (FIELDS: Record<string, unknown>, USER_TYPE: string): Promise<string | null | undefined> {
  const errors: string[] = []
  let FIRST_VOID_NAME: boolean = false
  for (const field in FIELDS) {
    if (FIELDS[field] === null || FIELDS[field] === '' || FIELDS[field] === undefined) {
      if (!FIRST_VOID_NAME) {
        errors.push('Los siguientes campos deben ser llenados:' + friendlyNames[field as keyof FormData])
        FIRST_VOID_NAME = true
      } else {
        errors.push(friendlyNames[field as keyof FormData])
      }
    }
  }
  if (errors.length > 0) {
    return errors.join(', ')
  }
  if (FIELDS.password !== FIELDS.confirm_password) {
    errors.push('las contraseñas no coinciden')
  }
  if (!validator.isStrongPassword(FIELDS.password as string)) {
    errors.push('La contraseña debe de tener por lo menos 8 caracteres, una minúscula, una mayúscula, un número y un símbolo')
  }
  const REPEATED_EMAIL = await Promise.all([Student.findOne({ email: FIELDS.email }), Teacher.findOne({ email: FIELDS.email })])

  if (REPEATED_EMAIL !== undefined || REPEATED_EMAIL !== null) {
    errors.push('El correo ya existe')
  }
  if (USER_TYPE === 'STUDENT') {
    const carreers = await Carreer.find({}, { _id: 1 })
    if (!validator.isEmail(FIELDS.email as string)) {
      errors.push('El correo no es valido')
    }
    if (!validator.matches(FIELDS.name as string, /^[a-zA-Z\u00C0-\u00FF. ]+$/)) {
      errors.push('El nombre solo debe contener letras o espacios')
    }
    if (!validator.isMobilePhone(FIELDS.phone as string)) {
      errors.push('El telefono no es valido')
    }
    if (!validator.isNumeric(FIELDS.ticket_number as string)) {
      errors.push('La boleta no es valida')
    }

    const TICKET_NUMBER = await Student.findOne({ boleta: FIELDS.boleta })
    if (TICKET_NUMBER !== null || TICKET_NUMBER !== undefined) {
      errors.push('La boleta ya existe')
    }
    if (!carreers.includes(FIELDS.career)) {
      errors.push('La carrera no existe')
    }
    return errors.join(', ')
  } else if (USER_TYPE === 'teacher') {
    if (!validator.isNumeric(FIELDS.numero_empleado as string)) {
      errors.push('El número de empleado debe tener sólo números')
    }
    if (!validator.isEmail(FIELDS.correo_institucional as string)) {
      errors.push('El correo institucional no es válido')
    }

    if (!validator.isEmail(FIELDS.correo_electronico as string)) {
      errors.push('El correo electrónico no es válido')
    }
    if (!validator.isMobilePhone(FIELDS.telefono as string)) {
      errors.push('El teléfono proporcionado no es válido')
    }
  }
}
