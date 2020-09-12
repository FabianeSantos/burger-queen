import React, { useState, useEffect } from 'react';
import styles from './Pedido.module.css';
import firebase from '../../firebase/Firebase';

const PedidosMesero = (props) => {
    const [showOrderStatus, setShowOrderStatus] = useState([]);

    const refListas = firebase.firestore().collection('ordenesListas');
    const refEntregadas = firebase.firestore().collection('ordenesEntregadas');

    const getOrdenesListas = () => {
        refListas
            .onSnapshot((querySnapshot) => {
                // console.log(querySnapshot.docs);
                setShowOrderStatus(querySnapshot.docs);
            })
    };

    useEffect(() => {
        getOrdenesListas();
    }, []);

    // crea coleccion de Ordenes Entregada
    const agregarOrdenEntregada = (ordenEntregada) => {
        refEntregadas.add(ordenEntregada);
    }
    //Elimina orden de Lista para entregar
    const deleteOrdenEntregada = (ordenId) => {
        return refListas
            .doc(ordenId)
            .delete()
            .then(function () {
                console.log("Document successfully deleted!");
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
    };

    const enviarPedidoEntregado = (ordenEntregada, documentoId, index) => {
        console.log(ordenEntregada);
        console.log(documentoId);
        console.log(index);

        const filltroPedidosentregados = showOrderStatus.filter(pedidoListo => {
            pedidoListo = pedidoListo.data().id;
            console.log(pedidoListo);
            console.log(ordenEntregada.id);
            return pedidoListo !== ordenEntregada.id;
        });

        agregarOrdenEntregada(ordenEntregada);
        deleteOrdenEntregada(documentoId);
        setShowOrderStatus(filltroPedidosentregados); 

    }

    return (

        <div className={styles.sectionPedido}>
            {
                showOrderStatus.map((documentos, index) => {
                    return (
                        <div Key={index} className={styles.sectionItemPedido}>
                            {
                                [documentos.data()].map((ordenesEntregadas, indiceOrden) => {
                                    return (
                                        <div key={ordenesEntregadas} className={styles.boxItemPedido}>
                                            <div key={indiceOrden} className={styles.sectionItem}>
                                                <div>
                                                    {ordenesEntregadas.id}
                                                    Mesa:{ordenesEntregadas.mesa}
                                                </div>
                                                <div>
                                                    Cliente:{ordenesEntregadas.cliente}
                                                </div>

                                            </div>
                                        </div>
                                    )
                                })
                            }

                            <div className={styles.buttonKitchen}>
                                <button
                                    onClick={() => enviarPedidoEntregado((documentos.data()), documentos.id, index)}
                                    className={styles.botonCocina}>Entregado</button>
                                {/* <button className={styles.botonCocina}>Listo para entregar</button> */}
                            </div>
                        </div>
                    )
                })
            }

        </div >
    )
}

export default PedidosMesero;