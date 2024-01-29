import {Schema, model, models} from 'mongoose';
import { nanoid } from 'nanoid';

const DocenteSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    numeroEmpleado: {
        type: String,
        required: true,
        maxlength: 10
    },
    correoInstitucional: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    contraseña: {
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
    academia: {
        type: String,
        required: true
    }
});

export default models.Docente || model('Docente', DocenteSchema);