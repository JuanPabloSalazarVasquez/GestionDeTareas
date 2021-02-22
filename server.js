// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const bcryptjs = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 8080; // Establecer puerto
const routes = require('./routes/api');

// Conectar al servidor de mongodb
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tareas_geek', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('¡Base de datos conectada!');
});

// Parseo de datos
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Seleccionar la carpeta con los archivos para la app 
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// Definir ruta para peticiones http
app.use(morgan('tiny'));
app.use('/api', routes);



//Avisar cuando esté todo listo
app.listen(PORT, console.log(`Server is starting at ${PORT}`));

module.exports = app;