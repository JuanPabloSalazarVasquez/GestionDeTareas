const express = require('express');
const bcryptjs = require("bcryptjs");
const router = express.Router();

//Establecer model
const Tarea = require('../models/tarea');
const Usuario = require("../models/usuario");
//Establecer model

//Usuarios
router.get('/usuarios', (req, res) => {
    Usuario.find({})
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
}); //Obtener todos los usuarios

router.post('/usuarios/register', (req, res) => {
    const data = req.body;

    let passwordHash = bcryptjs.hashSync(data.password, 9);

    data.password = passwordHash;

    const newUsuario = new Usuario(data);

    newUsuario.save((error) => {
        if (error) {
            return res.status(500).json({ message: 'Error en el servidor: ' + error });
        } else {
            return res.json({
                message: '¡Usuario guardado con éxito!'
                //passwordHash: passwordHash
            });
        }
    });
}) //Registrar usuario

router.post('/usuarios/login', async (req, res) => {
    const data = req.body;

    const datos = await Usuario.find({ email: data.email })
        .catch((error) => {
            return res.json({ message: 'Error obteniendo el usuario: ' + error });
        });

    const datadb = await JSON.parse(JSON.stringify(datos));

    const compare = await bcryptjs.compare(data.password, datadb[0].password).catch((error) => {
        return res.json({
            message: 'Error al comparar: ' + error,
            //datas:  'Data: ' + data.password + 'Datadb: ' + datadb[0].password
        });
    })

    if (compare) {
        return res.json({
            message: "¡Todo correcto!",
            datos: datadb
        })
    } else {
        return res.json({
            message: "Usuario o contraseña incorrectos"
        })
    }
});//Login

router.delete('/usuario/:id', async (req, res) => {
    const id = req.params.id;

    await Usuario.findByIdAndDelete(id);
    return res.json({
        msg: '¡Usuario eliminado con éxito!'
    })
})
//Usuarios

// Routes
router.get('/:id_usuario', (req, res) => {

    Tarea.find({})
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

router.put('/:id', async (req, res) => {
    const { imagen, nombre, descripcion, prioridad, fecha } = req.body;
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

    await Tarea.findByIdAndDelete(id).then(() => {
        return res.json({
            msg: '¡Tarea eliminada con éxito!'
        })
    });
    

}); /*Petición para borrar tareas según su id */



module.exports = router;