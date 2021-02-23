import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

//Css imports
import '../styles/styles.css'
//Css imports

const Register = () => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      user: user,
      email: email,
      password: password,
    };

    axios({
      url: '/api/usuarios/register',
      method: 'POST',
      data: payload
    })
      .then((response) => {
        console.log('Datos enviados al servidor.');
        JSON.stringify(response)
        if (response.data.message == '¡Usuario guardado con éxito!') {
          setRedirect(true);
          
        }else{
          alert(response.data.message)
        }
      })
      .catch((error) => {
        console.log(error)
        console.log(payload);;
      });

  }; /*Petición para agregar tareas */

  if (redirect) {
    return <Redirect to="/" />;
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
            <input name="user" onChange={e => setUser(e.target.value)} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" autoFocus placeholder="Ingrese su nombre de usuario" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default"></span>
            <input name="email" onChange={e => setEmail(e.target.value)} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="correo@ejemplo.com" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default"></span>
            <input name="password" onChange={e => setPassword(e.target.value)} type="password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Ingrese su contraseña" />
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

    </div>
  );
}

export default Register