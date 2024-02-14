import { Schema, model, models } from 'mongoose'

const AdminSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
export default models.Admin || model('Admin', AdminSchema)
