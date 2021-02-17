import React from "react";
import '../styles/lista.css';

//componentes inicio
import Modal_tarea from './modal_tarea';
import Tarea_card from './tarea_card'
//componentes fin

export default function Lista(props) {
    return (
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
                <Tarea_card items={this.state.items}/>
            </ul>
        </div>
    );
}