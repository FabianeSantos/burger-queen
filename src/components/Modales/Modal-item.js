import React, { useState, useEffect } from 'react';
import styles from './Modales.module.css';

const ModalDescripcionItem = (props) => {

    const cerrarModalDesplegado = () => {
        props.cerrarModalDescripcion();
    }


    return (
        // <div style={styleModal} className={styles.modal}>
        <div style={props.styleModal} className={styles.modal}>
            {/* Modal content*/}
            <div className={styles.modalContent}>
                
                <div
                    className={styles.containerItem}>
                    <div>
                    <img src={props.itemMostrado.img} alt="" className={styles.imgItemMenu} />
                    </div>
                    <h2>{props.itemMostrado.nombre}</h2>
                    <p>{props.itemMostrado.descripcion}</p>
                </div>
                <span
                    className={styles.close}
                    onClick={cerrarModalDesplegado}
                >&times; volver</span>
            </div>

        </div>
    )
}

//Administrar estado de Modal Use Manage Modal State, Hooks personalizado
const useModal = () => {
    const [styleModal, setStyleModal] = useState({ display: 'none' })

    const showModal = () => {
        setStyleModal({ display: 'block' });
    }

    const hideModal = () => {
        setStyleModal({ display: 'none' });
    }
    return [
        styleModal,
        showModal,
        hideModal
    ]

}

export {
    ModalDescripcionItem,
    useModal
};