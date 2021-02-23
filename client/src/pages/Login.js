import React, { useState } from 'react';
import { Redirect, Link } from "react-router-dom";
import axios from 'axios';

//Css imports
import '../styles/styles.css'
//Css imports

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usuario, setUsuario] = useState('');
  const [redirect, setRedirect] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      email: email,
      password: password,
    };

    axios({
      url: '/api/usuarios/login',
      method: 'POST',
      data: payload
    })
      .then((response) => {
        JSON.stringify(response)
        if (response.data.message == '¡Todo correcto!') {
          console.log('Datos enviados al servidor.');
          const user = JSON.stringify(response.data.datos[0]);
          setUsuario(user);

          setRedirect(true);
        }else{
          alert(response.data.message)
        }

      })
      .catch((error) => {
        console.log(error)
      });

  }; /*Petición para agregar tareas */

  if (redirect) {
    console.log(usuario);
    return <Redirect to={{pathname:"/lista", state:{usuario: usuario}}} />;
  }

  return (
    <div className="app">
      <h1 className="titulo">¡Bienvenid@!</h1>

      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title" id="exampleModalLabel"> Crea una cuenta para empezar a organizar tus tareas.</h4>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          {/*Cuerpo del modal*/}
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default"></span>
            <input name="email" onChange={e => setEmail(e.target.value)} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" autoFocus placeholder="correo@ejemplo.com" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default"></span>
            <input name="contraseña" onChange={e => setPassword(e.target.value)} type="password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Ingrese su contraseña" />
          </div>

          {/*Cuerpo del modal*/}
        </div>
        <div className="modal-footer">
          <button type="submit" className="btn btn-primary" onClick={submit}>Confirmar</button>
        </div>
      </div>

      <div>
        <p className="sm-txt">¿Aún no tienes una cuenta? <Link to="/register">Registrate</Link>.</p>
      </div>

    </div>
  );
}

export default Login;