import { Schema, model, models } from 'mongoose'

const CarreerSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
export default models.Carreer || model('Carrer', CarreerSchema)
