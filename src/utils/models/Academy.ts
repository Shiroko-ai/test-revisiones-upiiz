import mongoose from 'mongoose'

const { Schema, model, models } = mongoose
const AcademySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  teachers: {
    type: [Schema.Types.ObjectId],
    ref: 'Teacher'
  }
})

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
export default models.Academy || model('Academy', AcademySchema)
