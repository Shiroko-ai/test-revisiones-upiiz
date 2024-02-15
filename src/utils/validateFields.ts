import Student from './models/Student'
import Carreer from './models/Career'
import validator from 'validator'
import Teacher from './models/Teacher'
import Admin from './models/Admin'
interface FormData {
  name: string | null
  email: string | null
  password: string | null
  confirmPassword: string | null
  phone: string | null
  ticketNumber: string | null
  career: string | null
}
const friendlyNames: Record<keyof FormData, string> = {
  name: 'Nombre',
  email: 'Correo electrónico',
  password: 'Contraseña',
  confirmPassword: 'Confirmar contraseña',
  phone: 'Telefono',
  ticketNumber: 'Boleta',
  career: 'Carrera'
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
  if (FIELDS.password !== FIELDS.confirmPassword) {
    errors.push('las contraseñas no coinciden')
  }
  if (!validator.isStrongPassword(FIELDS.password as string)) {
    errors.push('La contraseña debe de tener por lo menos 8 caracteres, una minúscula, una mayúscula, un número y un símbolo')
  }
  const REPEATED_EMAIL = (await Promise.all([
    Student.findOne({ email: FIELDS.email }).exec(),
    Teacher.findOne({ email: FIELDS.email }).exec(),
    Admin.findOne({ email: FIELDS.email }).exec()
  ])).filter(result => result !== null)
  if (REPEATED_EMAIL.length > 0) {
    errors.push('El correo ya existe')
  }
  if (USER_TYPE === 'STUDENT') {
    const carreers = (await Carreer.find({}, { _id: 1 }).lean()).map((carrer: any) => carrer._id.toString())
    if (!validator.isEmail(FIELDS.email as string)) {
      errors.push('El correo no es valido')
    }
    if (!validator.matches(FIELDS.name as string, /^[a-zA-Z\u00C0-\u00FF. ]+$/)) {
      errors.push('El nombre solo debe contener letras o espacios')
    }
    if (!validator.isMobilePhone(FIELDS.phone as string)) {
      errors.push('El telefono no es valido')
    }
    if (!validator.isNumeric(FIELDS.ticketNumber as string)) {
      errors.push('La boleta no es valida')
    }
    console.log(FIELDS.ticketNumber)
    const TICKET_NUMBER = await Student.findOne({ ticketNumber: FIELDS.ticketNumber }).lean()
    console.log(TICKET_NUMBER)
    if (TICKET_NUMBER !== null && TICKET_NUMBER !== undefined) {
      errors.push('La boleta ya existe')
    }
    if (!carreers.includes(FIELDS.career)) {
      console.log(FIELDS.career)
      console.log(carreers)
      errors.push('La carrera no existe')
    }
    if (errors.length > 0) {
      return errors.join(', ')
    }
    return null
  } else if (USER_TYPE === 'TEACHER') {
    console.log('TEACHER')
    if (!validator.isNumeric(FIELDS.employeeNumber as string, { no_symbols: true })) {
      errors.push('El número de empleado debe tener sólo números')
    }
    if (!validator.isEmail(FIELDS.institutionalEmail as string)) {
      errors.push('El correo institucional no es válido')
    }

    if (!validator.isEmail(FIELDS.email as string)) {
      errors.push('El correo electrónico no es válido')
    }
    if (!validator.isMobilePhone(FIELDS.phone as string)) {
      errors.push('El teléfono proporcionado no es válido')
    }
    if (!validator.isAlpha(FIELDS.name as string, 'es-ES', { ignore: ' ' })) {
      errors.push('El nombre solo debe contener letras')
    }

    if (errors.length > 0) {
      return errors.join(', ')
    }
    return null
  }
}
