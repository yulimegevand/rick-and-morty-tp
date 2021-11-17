import React from 'react'

import { NavLink } from 'react-router-dom'

export default function Menu() {
    return (
        <nav>
            <ul  >
                <li>
                    <NavLink exact to="/" activeclass="active" >Inicio</NavLink>
                </li>
                <li>
                    <NavLink to="/episodes" activeclass="active">Episodios</NavLink>
                </li>     
                
            </ul>
        </nav>
    )
}
