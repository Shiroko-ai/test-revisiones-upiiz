import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const { Schema, model, models } = mongoose;
const AlumnoSchema = new Schema({
    id: {
        type: String,
        required: true,
        default: () => nanoid(10)
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    boleta: {
        type: String,
        required: true,
        unique: true
    },
    carrera: {
        type: String,
        enum: ['ISC', 'IMEC', 'IAM', 'IAL', 'IMET'],
        required: true
    },
    status: {
        type: String,
        enum: ['pendiente', 'activo'],
        required: true
    }
});

export default models.Alumno || model('Alumno', AlumnoSchema);
