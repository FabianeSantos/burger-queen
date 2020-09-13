import React, { useState } from 'react';
import styles from './Adicionales.module.css';

const AdicionalesComponent = (props) => {
    const [notasItemIngresado, setnotasItemIngresado] = useState('');
    const [adicionalesSeleccionados, setAdicionalesSeleccionados] = useState([]);



    const actualizaOrden = () => {
        props.actualizarAdicionales(props.orden, adicionalesSeleccionados, notasItemIngresado);
    };

    const captureNotasItem = (event) => {
        setnotasItemIngresado(event.target.value);
    }
    const checkActivado = (item, event) => {
        if (event.target.checked === true) {
            setAdicionalesSeleccionados([...adicionalesSeleccionados, item]);
        }
        else {
            const indiceItem = adicionalesSeleccionados.indexOf(item);
            adicionalesSeleccionados.splice(indiceItem, 1);
            setAdicionalesSeleccionados(adicionalesSeleccionados);
        }
    }

    return (
        <div>
            <h2>Adicionales:</h2>
            {
                props.orden && props.orden.adicionalesItem.map((item, indice) => {
                    return (
                        <div key={indice}>

                            <input
                                className={styles.checkbox}
                                onChange={(event) => checkActivado(item, event)}
                                type="checkbox"
                                name="adicionales"
                                value={item.precio}
                            />{item.nombre}
                        </div>
                    )
                })
            }
            <textarea className={styles.textarea} type="search" name="post" placeholder="Observaciones:"
                onChange={captureNotasItem}
                value={notasItemIngresado}>
            </textarea>
            <button onClick={actualizaOrden} className={styles.btnAlert}>Cerrar Adicionales</button>
        </div>
    )

}

export default AdicionalesComponent;

