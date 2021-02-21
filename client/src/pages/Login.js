import React, {SyntheticEvent, useState} from 'react';
import {Redirect} from "react-router-dom";

import { Link } from "react-router-dom";

//Css imports
import '../styles/styles.css'
//Css imports

const Login = ({props}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const submit = async (e = SyntheticEvent) => {
    e.preventDefault();

    const response = await fetch('/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(
        {
          email,
          password
        }
      )
    });

    const content = response.json()

    setRedirect(true);

    props.setNombre(content.nombre)

  }; /*Petición para agregar tareas */

  if (redirect) {
    return <Redirect to="/lista" />;
  }

  return (
    <div className="app">
      <h1 className="titulo">¡Bienvenid@!</h1>

      <form onSubmit={submit}>
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
              <input name="contraseña" onChange={e => setPassword(e.target.value)} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Ingrese su contraseña" />
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
      </form>
    </div>
  );
}

export default Login;