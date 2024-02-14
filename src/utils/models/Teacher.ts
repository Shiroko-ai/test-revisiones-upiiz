import { Schema, model, models } from 'mongoose'

const DocenteSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  employeeName: {
    type: String,
    required: true,
    maxlength: 10
  },
  institutionalEmail: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  academy: {
    type: String,
    required: true
  }
})

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
export default models.Docente || model('Docente', DocenteSchema)
