import React from 'react';
import axios from 'axios';

import Lista from './pages/lista';

//componentes inicio
import Modal_tarea from './components/modal_tarea';
import Tarea_card from './components/tarea_card';
//componentes fin

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
        window.location.reload(false);
      })
      .catch(() => {
        console.log('Error al borrar');
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
        window.location.reload(false);
      })
      .catch(() => {
        console.log('Error al borrar');
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
        {/*
        <div className="todoapp stack-large">
          <h1>Tareas Geek</h1>

          <Modal_tarea />

          <h2 id="list-heading">
            3 tasks remaining
        </h2>
          <ul
            role="list"
            className="todo-list stack-large stack-exception"
            aria-labelledby="list-heading"
          >
            <Tarea_card items={props.items} />
          </ul>
        </div>
        */}

        {/* QWERTY */}

        <h2>Welcome to the best app ever</h2>
        <form onSubmit={this.submit}>
          <div className="form-input">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <textarea
              placeholder="body"
              name="body"
              cols="30"
              rows="10"
              value={this.state.body}
              onChange={this.handleChange}
            >

            </textarea>
          </div>

          <button>Submit</button>
        </form>

        <div className="blog-">
          {this.displayTareas(this.state.posts)}
        </div>
      </div>
    );
  }
}


export default App;