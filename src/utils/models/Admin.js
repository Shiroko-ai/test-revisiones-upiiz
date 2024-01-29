import {Schema, model, models} from 'mongoose';

const AdminSchema = new Schema({
    correo: {
        type: String,
        required: true
    },
    contraseña: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    }
});

export default models.Admin || model('Admin', AdminSchema);