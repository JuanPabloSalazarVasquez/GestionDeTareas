const express = require('express');

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
            console.log('error: ', daerrorta);
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


router.get('/name', (req, res) => {
    const data =  {
        username: 'peterson',
        age: 5
    };
    res.json(data);
});



module.exports = router;