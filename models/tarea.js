const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const TareaSchema = new Schema({
    imagen: {
        type: String, 
        imagen: {$or:[{ $regex: /.png/ }, { $regex: /.PNG/ }, { $regex: /.jpg/ }, { $regex: /.JPG/ }, { $regex: /.jpeg/ }, { $regex: /.JPEG/ }]},
    },
    nombre: {
        type: String
    },
    descripcion: {
        type: String
    },
    prioridad: {
        type: Number
    },
    fecha: {
        type: String,
        default: Date.now()
    }
});

// Model
const Tarea = mongoose.model('Tarea', TareaSchema);

module.exports =  Tarea;