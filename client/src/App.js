/*
  Version 1.0
*/

import React from 'react';
import axios from 'axios';

//Css imports
import './styles/styles.css'
//Css imports

//Material-ui imports
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//Material-ui imports
class App extends React.Component {
  state = {
    id: '', //Esto sólo se usa al editar, de resto es automatico
    imagen: 'https://www.pinclipart.com/picdir/middle/379-3796154_profile-clipart-john-doe-circle-png-download.png',
    nombre: 'Tarea sin título',
    descripcion: 'No hay descripción',
    prioridad: '1',
    fecha: '2022/01/01',
    posts: []
  }; /*Aquí se maneja la información de las tareas */

  componentDidMount = () => {
    this.getTareas();
  }; /*Ejecuta getTareas al cargar la página */

  getTareas = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
        console.log('Datos recibidos.');
      })
      .catch(() => {
        alert('¡Error al recibir los datos!');
      });
  } /*Obtiene las tareas de la db */

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });

    console.log({ [name]: value });
  }; /*Actualiza el this.state cada vez que se hace un cambio a un campo */

  //Peticiones
  submit = (event) => {
    event.preventDefault();

    const payload = {
      imagen: this.state.imagen,
      nombre: this.state.nombre,
      descripcion: this.state.descripcion,
      prioridad: this.state.prioridad,
      fecha: this.state.fecha,
    };

    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Datos enviados al servidor.');
        this.resetUserInputs();
        this.getTareas();
        window.location.reload(false); 
      })
      .catch(() => {
        console.log('Error en el servidor');
      });
  }; /*Petición para agregar tareas */

  setTareaActual = (tarea) => {
    console.log('Tarea: ' + tarea);
    this.state.id = tarea._id;
    this.state.imagen = tarea.imagen;
    this.state.nombre = tarea.nombre;
    this.state.descripcion = tarea.descripcion;
    this.state.prioridad = tarea.prioridad;
    this.state.fecha = tarea.fecha;
  } /*Establecer en this.state la información de la tarea a editar */

  editTareas = () => {
    const id = this.state.id;

    const payload = {
      imagen: this.state.imagen,
      nombre: this.state.nombre,
      descripcion: this.state.descripcion,
      prioridad: this.state.prioridad,
      fecha: this.state.fecha
    };

    axios({
      url: `/api/${id}`,
      method: 'PUT',
      data: payload
    })
      .then(() => {
        console.log('Datos enviados al servidor.');
        this.resetUserInputs();
        this.getTareas();
        window.location.reload(false);
      })
      .catch(() => {
        alert('Error en el servidor');
      });
  } /*Petición para editar tareas según su id, esta id llega por this.state en vez de por params */

  deleteTareas = (id) => {
    axios({
      url: `/api/${id}`,
      method: 'DELETE'
    })
      .then(() => {
        console.log('Tarea borrada con exito.')
        console.log(id);
        this.getTareas();
      })
      .catch(() => {
        alert('Ocurrió un error al borrar la tarea, intente nuevamente.');
      });
  } /*Petición para borrar tareas según su id */
  //Peticiones

  resetUserInputs = () => {
    this.setState({
      imagen: 'https://www.pinclipart.com/picdir/middle/379-3796154_profile-clipart-john-doe-circle-png-download.png',
      nombre: 'Tarea sin título',
      descripcion: 'No hay descripción',
      prioridad: '1',
      fecha: '2022/01/01'
    });
  }; /*Devuelve los campos a sus valores predeterminados */

  displayTareas = (tareas) => {
    if (!tareas.length) return null;

    return tareas.map((tareas, index) => (
      <div key={index} className="blog-post__display">
        <li className="todo stack-small">
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Imagen de la tarea"
                height="140"
                image={tareas.imagen}
                title="Tareas img"
              />
              <CardContent>
                <Typography gutterBottom variant="h2" component="h2">
                  {tareas.nombre}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {tareas.descripcion}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {tareas.prioridad}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {tareas.fecha}
                </Typography>
              </CardContent>
            </CardActionArea>
            <hr />
            <CardActions>
              <div className="btn-group">
                <button onClick={() => this.setTareaActual(tareas)} data-bs-toggle="modal" data-bs-target="#editModal" className="btn"> {/*HACER PARA EDIT LAS TAREAS*/}
                    Editar
                </button>
                <button onClick={() => this.deleteTareas(tareas._id)} className="btn btn__danger">
                  Borrar
                </button>
              </div>
            </CardActions>
          </Card>
        </li>
      </div>
    ));
  }; /*Hace un map a las tareas obtenidas con la función de getTareas */

  render() {
    //JSX
    return (
      <div className="app">
        <h1>¡Bienvenido a Tareas Geek!</h1>

        <button type="button" className="btn btn__primary btn__lg" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Añadir nueva tarea
        </button>

        <h2>
          Quedan {this.state.posts.length} tareas
        </h2>

        <div className="blog-">
          {this.displayTareas(this.state.posts)}
        </div>


        {/*MODAL POST*/}

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="exampleModalLabel">Añadir nueva tarea </h4>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {/*Cuerpo del modal*/}
                <h5>Los campos marcados con * son obligatorios</h5>
                <hr />
                <div className="input-group mb-3">
                  <span className="input-group-text" id="inputGroup-sizing-default">*</span>
                  <input name="nombre" onChange={this.handleChange} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" autoFocus placeholder="Nombre de la tarea *" />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="inputGroup-sizing-default"></span>
                  <input name="descripcion" onChange={this.handleChange} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Descripción de la tarea" />
                </div>

                <div className="input-group mb-3">
                  <label className="input-group-text" htmlFor="inputGroupSelect02">*</label>
                  <select name="prioridad" onChange={this.handleChange} className="form-select" id="inputGroupSelect02" placeholder="Selecciona la prioridad">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="inputGroup-sizing-default">*</span>
                  <input name="fecha" onChange={this.handleChange} type="date" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Fecha límite de la tarea" />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="inputGroup-sizing-default"></span>
                  <input name="imagen" onChange={this.handleChange} type="file" accept="image/*" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"  placeholder="Imagen de la tarea" />
                </div>
                {/*Cuerpo del modal*/}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={this.resetUserInputs}>Cancelar</button>
                <button type="button" className="btn btn-primary" onClick={this.submit}>Guardar tarea</button>
              </div>
            </div>
          </div>
        </div>



        {/*MODAL EDIT*/}

        <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="exampleModalLabel">Añadir nueva tarea </h4>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {/*Cuerpo del modal*/}
                <h5>Los campos marcados con * son obligatorios</h5>
                <hr />
                <div className="input-group mb-3">
                  <span className="input-group-text" id="inputGroup-sizing-default">*</span>
                  <input name="nombre" onChange={this.handleChange} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" autoFocus placeholder="Nombre de la tarea *" />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="inputGroup-sizing-default"></span>
                  <input name="descripcion" onChange={this.handleChange} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Descripción de la tarea" />
                </div>

                <div className="input-group mb-3">
                  <label className="input-group-text" htmlFor="inputGroupSelect02">*</label>
                  <select name="prioridad" onChange={this.handleChange} className="form-select" id="inputGroupSelect02" placeholder="Selecciona la prioridad">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="inputGroup-sizing-default">*</span>
                  <input name="fecha" onChange={this.handleChange} type="date" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="inputGroup-sizing-default"></span>
                  <input name="imagen" onChange={this.handleChange} type="file" accept="image/*" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                </div>
                {/*Cuerpo del modal*/}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={this.resetUserInputs}>Cancelar</button>
                <button type="button" className="btn btn-primary" onClick={this.editTareas}>Guardar cambios</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default App;