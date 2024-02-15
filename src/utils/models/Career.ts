import { Schema, model, models } from 'mongoose'

const CareerSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
export default models.Career || model('Career', CareerSchema)
