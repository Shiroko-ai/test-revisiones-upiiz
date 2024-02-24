import { Schema, model, models } from 'mongoose'
import { nanoid } from 'nanoid'

const TeacherSchema = new Schema({
  id: {
    type: String,
    required: true,
    default: () => nanoid(10)
  },
  employeeNumber: {
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
    type: Schema.Types.ObjectId,
    ref: 'Academy',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'active'],
    default: 'pending'
  }
})

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
export default models.Teacher || model('Teacher', TeacherSchema)
