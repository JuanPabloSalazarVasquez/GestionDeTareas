import React, { SyntheticEvent, useState } from 'react';
import {Redirect} from 'react-router-dom';

import { Link } from "react-router-dom";

//Css imports
import '../styles/styles.css'
import { json } from 'body-parser';
//Css imports

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [redirect, setRedirect] = useState(false );

  const submit = async (e = SyntheticEvent) => {
    e.preventDefault();

    await fetch('/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          nombre,
          email,
          password,
          password2
        }
      )
    }
    );

    setRedirect(true);

  }; /*Petición para agregar tareas */

  if (redirect) {
    return <Redirect to="/" />;
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
              <input name="nombre" onChange={e => setNombre(e.target.value)} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" autoFocus placeholder="Ingrese su nombre de usuario" />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="inputGroup-sizing-default"></span>
              <input name="email" onChange={e => setEmail(e.target.value)} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="correo@ejemplo.com" />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="inputGroup-sizing-default"></span>
              <input name="contraseña" onChange={e => setPassword(e.target.value)} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Ingrese su contraseña" />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="inputGroup-sizing-default"></span>
              <input name="contraseña2" onChange={e => setPassword2(e.target.value)} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Repita su contraseña" />
            </div>

            {/*Cuerpo del modal*/}
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary" onClick={submit}>Confirmar</button>
          </div>
        </div>

        <div>
          <p className="sm-txt">¿Ya tienes una cuenta? <Link to="/">Inicia sesión</Link>.</p>
        </div>
      </form>
    </div>
  );
}

export default Register