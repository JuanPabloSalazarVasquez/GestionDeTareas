import React, {useEffect, useState} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

//Componentes inicio
import Nav from "./components/nav";
//Componentes fin

//Paginas inicio
import Lista from './pages/Lista';
import Login from './pages/Login';
import Register from './pages/Register';
//Paginas fin

function App() {
    const [nombre, setNombre] = useState('')

    useEffect(() => {
        (
            async () => {
                const response = await fetch('/user/user', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                });

                const content = await response.json();

                setNombre(content.nombre);
            }
        )()
    });

    return (
        <div className="App">
            <BrowserRouter>
                <Nav nombre={nombre} setNombre={setNombre} />

                <main>
                    <Route path="/" exact component={() => <Login setNombre={setNombre} />} />
                    <Route path="/register" exactc component={() => <Register />} />
                    <Route path="/lista" exact component={() => <Lista nombre={nombre} />} />
                </main>
            </BrowserRouter>
        </div>
    )
}
export default App;