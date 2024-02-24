import mongoose from 'mongoose'
import { nanoid } from 'nanoid'

const { Schema, model, models } = mongoose
const StudentSchema = new Schema({
  id: {
    type: String,
    required: true,
    default: () => nanoid(10)
  },
  email: {
    type: String,
    required: true,
    unique: true
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
  ticketNumber: {
    type: String,
    required: true,
    unique: true
  },
  career: {
    type: Schema.Types.ObjectId,
    ref: 'Career'
  },
  status: {
    type: String,
    enum: ['pending', 'active'],
    required: true
  },
  documents: [{
    name: {
      type: String
    },
    path: {
      type: String
    }
  }]
})

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
export default models.Student || model('Student', StudentSchema)
