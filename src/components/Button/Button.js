import React from 'react';
import styles from './Button.module.css'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";


const BtnCerrarSesion = () => {

    const closeSetion = () => {
        localStorage.setItem('user', '');
    }

    return (
        <div className={styles.buttoncerrar}>
            <button onClick={closeSetion} className={styles.buttonSalir}><Link to="/">Cerrar Sesión</Link></button>
        </div>

    )
}

export default BtnCerrarSesion;