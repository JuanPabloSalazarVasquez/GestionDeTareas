import React from 'react';
import axios from 'axios';

import Lista from './pages/lista';

//componentes inicio
import Modal_tarea from './components/modal_tarea';
import Tarea_card from './components/tarea_card';
//componentes fin

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
      });;
  };

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
        <h3>{tareas.title}</h3>
        <p>{tareas.body}</p>

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