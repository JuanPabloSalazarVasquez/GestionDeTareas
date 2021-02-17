var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
const { Schema, model } = require('mongoose');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/tareasGeek", { useNewUrlParser: true, useUnifiedTopology: true });

const tareaSchema = new Schema({
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
        type: Date
    }
});

const Tarea = mongoose.model("Tarea", tareaSchema);


//Añadir tareas por defecto inicio
const Tarea1 = new Tarea({
    imagen: "https://www.pinclipart.com/picdir/middle/379-3796154_profile-clipart-john-doe-circle-png-download.png",
    nombre: "Bienvenido a Tareas Geek",
    descripcion: "Primera tarea de prueba",
    prioridad: 1,
    fecha: new Date("2021, 02, 15")
});
const Tarea2 = new Tarea({
    imagen: "https://www.pinclipart.com/picdir/middle/379-3796154_profile-clipart-john-doe-circle-png-download.png",
    nombre: 'Dale al boton de "Agregar nueva tarea" para agregar una tarea',
    descripcion: "Segunda tarea de prueba",
    prioridad: 2,
    fecha: new Date("2021, 02, 15")
});
const Tarea3 = new Tarea({
    imagen: "https://www.pinclipart.com/picdir/middle/379-3796154_profile-clipart-john-doe-circle-png-download.png",
    nombre: "Dale al botón de eliminar a la izquierda de una tarea",
    descripcion: "Tercera tarea de prueba",
    prioridad: 3,
    fecha: new Date("2021, 02, 15")
});
const d = [Tarea1, Tarea2, Tarea3];
//Añadir tareas por defecto fin

app.get("/", function (req, res) {
    Item.find({}, function (err, f) {
        if (f.length === 0) {
            Item.insertMany(d, function (err) {
                if (err) {

                    console.log(err);
                }
                else {
                    console.log("Tarea agregada con éxito");
                }
            });
        }
        else {
            res.render("list", { newListItems: f });
        }
    });
})

app.post("/", function (req, res) {
    const tareaImagen = req.body.i;
    const tareaName = req.body.n;
    const tareaDescripcion = req.body.d;
    const tareaPrioridad = req.body.p;
    const tareaFecha = req.body.f;

    const tarea = new Tarea({
        imagen: tareaImagen,
        nombre: tareaName,
        descripcion: tareaDescripcion,
        prioridad: tareaPrioridad,
        fecha: tareaFecha
    });
    tarea.save();
    res.redirect("/");
});

app.post("/delete", function (req, res) {
    const check = req.body.checkbox;
    Item.findByIdAndRemove(check, function (err) {
        if (!err) {
            console.log("Successfully deleted");
            res.redirect("/");
        }
    })
});



app.listen(3000, function () {
    console.log("Server is listening to port 3000");
})

