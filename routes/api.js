const express = require('express');
const ObjectId = require('mongodb').ObjectId;

const router = express.Router();

const Tarea = require('../models/tarea');


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
});

router.post('/save', (req, res) => {
    const data = req.body;

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
});

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
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    await Tarea.findByIdAndDelete(id);
    return res.json({
        msg: '¡Tarea eliminada con éxito!'
    })
    
});



module.exports = router;