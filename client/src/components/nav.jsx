import React from 'react';
import {Link} from 'react-router-dom';

const Nav = (props) => {
    let menu;

    const logout = async () => {
        await fetch('http//:localhost:8080/user/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        props.setName('');
    }

    if (props.nombre === '') {
        menu = (
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link to="/" className="nav-link"> Inicia sesión </Link>
                </li>
                <li className="nav-item active">
                    <Link to="/register" className="nav-link"> Registrate </Link>
                </li>
            </ul>
        )
    } else {
        menu = (
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link to="/" className="nav-link" onclick={logout}> Cierra sesión </Link>
                </li>
            </ul>
        )
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    {menu}
                </div>
            </div>
        </nav>
    )
}

export default Nav;