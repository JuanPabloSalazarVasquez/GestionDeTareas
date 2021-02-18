import React from 'react';
import axios from 'axios';

import './styles/styles.css'

//Material-ui inicio
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//Material-ui inicio
class App extends React.Component {
  state = {
    imagen: '',
    nombre: '',
    descripcion: '',
    prioridad: '',
    fecha: '',
    posts: []
  };

  componentDidMount = () => {
    this.getTareas();
  };


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
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });

    console.log({ [name]: value });
  };


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
  };

  editTareas = (id) => {
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
        console.log('Ocurrió un error al editar la tarea, intente nuevamente.');
      });
  }

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
  }

  resetUserInputs = () => {
    this.setState({
      imagen: '',
      nombre: '',
      descripcion: '',
      prioridad: '',
      fecha: ''
    });
  };

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
                <Typography gutterBottom variant="h5" component="h2">
                  <p>{tareas.nombre}</p>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <p>{tareas.descripcion}</p>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <p>{tareas.prioridad}</p>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <p>{tareas.fecha}</p>
                </Typography>
              </CardContent>
            </CardActionArea>
            <hr />
            <CardActions>
              <div className="btn-group">
                <button onClick={() => this.editTareas(tareas._id)} className="btn"> {/*HACER PARA EDIT LAS TAREAS*/}
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
  };

  render() {

    console.log('State: ', this.state);

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


        {/*MODAL*/}

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
      </div>
    );
  }
}


export default App;