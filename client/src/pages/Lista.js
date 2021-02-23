/*
  Version 1.0
*/

import React, { useState } from 'react';
import axios from 'axios';

//Css imports
import '../styles/styles.css'
//Css imports

//Material-ui imports
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//Material-ui imports

const Lista = (props) => {
  const [id, setId] = useState(''); //Esto sólo se usa al editar, de resto es automatico
  const [imagen, setImagen] = useState('https://www.pinclipart.com/picdir/middle/379-3796154_profile-clipart-john-doe-circle-png-download.png');
  const [nombre, setNombre] = useState('Tarea sin título');
  const [descripcion, setDescripcion] = useState('No hay descripción');
  const [prioridad, setPrioridad] = useState('1');
  const [fecha, setFecha] = useState('2022/01/01');
  const [posts, setPosts] = useState([]);
  const user = JSON.stringify(props);
  const usuario = props.usuario;

  const getTareas = () => {
    console.log('props: ' + props);
    console.log('user: ' + user);
    console.log('usuario: ' + usuario);
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        setPosts( data );
        console.log('Datos recibidos.');
      })
      .catch(() => {
        alert('¡Error al recibir los datos!');
      });
  } /*Obtiene las tareas de la db */

  //Peticiones
  const submit = (event) => {
    event.preventDefault();

    const payload = {
      imagen: imagen,
      nombre: nombre,
      descripcion: descripcion,
      prioridad: prioridad,
      fecha: fecha,
    };

    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Datos enviados al servidor.');
        resetUserInputs();
        getTareas();
        window.location.reload(false);
      })
      .catch((error) => {
        console.log('Error en el servidor: ' + error);
      });
  }; /*Petición para agregar tareas */

  const setTareaActual = (tarea) => {
    setId(tarea._id);
    setImagen(tarea.imagen);
    setNombre(tarea.nombre);
    setDescripcion(tarea.descripcion);
    setPrioridad(tarea.prioridad);
    setFecha(tarea.fecha);
  } /*Establecer en state la información de la tarea a editar */

  const editTareas = () => {
    const payload = {
      imagen: imagen,
      nombre: nombre,
      descripcion: descripcion,
      prioridad: prioridad,
      fecha: fecha
    };

    axios({
      url: `/api/${id}`,
      method: 'PUT',
      data: payload
    })
      .then(() => {
        console.log('Datos enviados al servidor.');
        resetUserInputs();
        getTareas();
        window.location.reload(false);
      })
      .catch(() => {
        alert('Error en el servidor');
      });
  } /*Petición para editar tareas según su id, esta id llega por state en vez de por params */

  const deleteTareas = (id) => {
    axios({
      url: `/api/${id}`,
      method: 'DELETE'
    })
      .then(() => {
        console.log('Tarea borrada con exito.')
        getTareas();
      })
      .catch(() => {
        alert('Ocurrió un error al borrar la tarea, intente nuevamente.');
      });
  } /*Petición para borrar tareas según su id */
  //Peticiones

  const resetUserInputs = () => {
      setImagen('https://www.pinclipart.com/picdir/middle/379-3796154_profile-clipart-john-doe-circle-png-download.png');
      setNombre('Tarea sin título');
      setDescripcion('No hay descripción');
      setPrioridad('1');
      setFecha('2022/01/01');
  }; /*Devuelve los campos a sus valores predeterminados */

  const displayTareas = (tareas) => {
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
                <button onClick={() => setTareaActual(tareas)} data-bs-toggle="modal" data-bs-target="#editModal" className="btn">
                  Editar
                </button>
                <button onClick={() => deleteTareas(tareas._id)} className="btn btn__danger">
                  Borrar
                </button>
              </div>
            </CardActions>
          </Card>
        </li>
      </div>
    ));
  }; /*Hace un map a las tareas obtenidas con la función de getTareas */

  window.onload = getTareas;
  return (
    <div className="app">
      <h1>¡Bienvenid@ a Tareas Geek!</h1>

      <button type="button" className="btn btn__primary btn__lg" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Añadir nueva tarea
        </button>

      <h2>
        Quedan {posts.length} tareas
        </h2>

      <div className="blog-">
        {displayTareas(posts)}
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
              <h5>Ingrese los datos de la tarea</h5>
              <hr />
              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default"></span>
                <input name="nombre" onChange={e => setNombre(e.target.value)} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" autoFocus placeholder="Nombre de la tarea *" />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default"></span>
                <input name="descripcion" onChange={e => setDescripcion(e.target.value)} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Descripción de la tarea" />
              </div>

              <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="inputGroupSelect02"></label>
                <select name="prioridad" onChange={e => setPrioridad(e.target.value)} className="form-select" id="inputGroupSelect02" placeholder="Selecciona la prioridad">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default"></span>
                <input name="fecha" onChange={e => setFecha(e.target.value)} type="date" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Fecha límite de la tarea" />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default"></span>
                <input name="imagen" onChange={e => setImagen(e.target.value)} type="file" accept="image/*" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Imagen de la tarea" />
              </div>
              {/*Cuerpo del modal*/}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={resetUserInputs}>Cancelar</button>
              <button type="button" className="btn btn-primary" onClick={submit}>Guardar tarea</button>
            </div>
          </div>
        </div>
      </div>



      {/*MODAL EDIT*/}

      <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="exampleModalLabel">Editar una tarea </h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/*Cuerpo del modal*/}
              <h5>No es necesario que edite todos los campos</h5>
              <hr />
              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default"></span>
                <input name="nombre" onChange={e => setNombre(e.target.value)} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" autoFocus placeholder='Nuevo título' />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default"></span>
                <input name="descripcion" onChange={e => setDescripcion(e.target.value)} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Nueva descripción' />
              </div>

              <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="inputGroupSelect02"></label>
                <select name="prioridad" onChange={e => setPrioridad(e.target.value)} className="form-select" id="inputGroupSelect02" placeholder="Selecciona la prioridad">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default"></span>
                <input name="fecha" onChange={e => setFecha(e.target.value)} type="date" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default"></span>
                <input name="imagen" onChange={e => setImagen(e.target.value)} type="file" accept="image/*" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
              </div>
              {/*Cuerpo del modal*/}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={resetUserInputs}>Cancelar</button>
              <button type="button" className="btn btn-primary" onClick={editTareas}>Guardar cambios</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Lista;