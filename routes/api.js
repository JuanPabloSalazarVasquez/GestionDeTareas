const express = require('express');

const router = express.Router();

//Establecer model
const Tarea = require('../models/tarea');
//Establecer model

// Routes
router.get('/', (req, res) => {
    Tarea.find({  })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
}); /*Obtiene las tareas de la db */

router.post('/save', (req, res) => {
    const data = req.body;

    console.log("Data: " + data);

    const newTarea = new Tarea(data);

    newTarea.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Error en el servidor' });
            return;
        }
        // Tarea
        return res.json({
            msg: '¡Tarea guardada con éxito!'
        });
    });
}); /*Petición para agregar tareas */

router.put('/:id', async(req, res) => {
    const {imagen, nombre, descripcion, prioridad, fecha} = req.body;
    const id = req.params.id;
    
    await Tarea.findByIdAndUpdate(id, {
        $set: req.body
    }, (err, resultset) => {
        if (err) {
            res.status(500).json({ msg: 'Error en el servidor' });
            return;
        } else {
            return res.json({
                msg: '¡Tarea actualizada con éxito!'
            })
        }

    })
}) /*Petición para editar tareas según su id */

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    await Tarea.findByIdAndDelete(id);
    return res.json({
        msg: '¡Tarea eliminada con éxito!'
    })
    
}); /*Petición para borrar tareas según su id */



module.exports = router;