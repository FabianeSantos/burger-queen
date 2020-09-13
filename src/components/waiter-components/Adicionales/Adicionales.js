import React, { useEffect, useState } from 'react';
import styles from './Adicionales.module.css';

const AdicionalesComponent = (props) => {
    const [notasItemIngresado, setnotasItemIngresado] = useState(props.orden.observaciones);
    const [adicionalesSeleccionados, setAdicionalesSeleccionados] = useState(props.orden.adicionalesSeleccionados);



    const actualizaOrden = () => {
        props.actualizarAdicionales(props.orden, adicionalesSeleccionados, notasItemIngresado, props.index);
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

    const validarCheckedCheckbox = (item) => {

        const indexAdicionalSeleccion = adicionalesSeleccionados.indexOf(item);

        if (indexAdicionalSeleccion === -1) {
            return false;
        }
        else {
            return true;
        }

    }

    useEffect(() => {
        setnotasItemIngresado(props.orden.observaciones);
        setAdicionalesSeleccionados([...props.orden.adicionalesSeleccionados]);
    }, [props.orden.observaciones, props.orden.adicionalesSeleccionados]);

    return (
        <div className={styles.datosAdicionales}>
            <div>
            <h2>Adicionales:</h2>
            {
                props.orden.adicionalesItem && props.orden.adicionalesItem.map((item, indice) => {
                    return (
                        <div key={indice}>

                            <input
                                className={styles.checkbox}
                                onChange={(event) => checkActivado(item, event)}
                                type="checkbox"
                                name="adicionales"
                                value={item.precio}
                                checked={validarCheckedCheckbox(item)}
                            /><span>{item.nombre}</span>
                            {/* {item.nombre.charAt(0).toUpperCase()+ item.nombre.slice(1)} */}
                        </div>
                    )
                })
            }
            <textarea className={styles.textarea} type="search" name="post" placeholder="Observaciones:"
                onChange={captureNotasItem}
                value={notasItemIngresado}>
            </textarea>
            <button onClick={actualizaOrden} className={styles.btnAlertWhite}>Cerrar Adicionales</button>
            </div>
        </div>
    )

}

export default AdicionalesComponent;

