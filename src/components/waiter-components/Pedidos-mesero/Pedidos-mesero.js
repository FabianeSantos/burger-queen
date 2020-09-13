import React, { useState, useEffect } from 'react';
import styles from './Pedido.module.css';
import firebase from '../../../firebase/Firebase';

const PedidosMesero = (props) => {
    const [showOrderStatus, setShowOrderStatus] = useState([]);

    const refListas = firebase.firestore().collection('ordenesListas');
    const refEntregadas = firebase.firestore().collection('ordenesEntregadas');

    const getOrdenesListas = () => {
        refListas
            .onSnapshot((querySnapshot) => {
                
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

    const enviarPedidoEntregado = (ordenEntregada, documentoId) => {

        const filltroPedidosentregados = showOrderStatus.filter(pedidoListo => {
            pedidoListo = pedidoListo.data().id;
            return pedidoListo !== ordenEntregada.id;
        });

        agregarOrdenEntregada(ordenEntregada);
        deleteOrdenEntregada(documentoId);
        setShowOrderStatus(filltroPedidosentregados);

    }

    return (

        <div className={styles.sectionPedido}>
            {
                showOrderStatus.map((documentos) => {                   
                    return (
                        <div key={documentos.id} className={styles.sectionItemPedido}>

                            <div className={styles.boxItemPedido}>
                                <div className={styles.sectionItem}>

                                        {documentos.data().id}
                                     <div className= {styles.boxmesa}>
                                        Mesa:{documentos.data().mesa}
                                    </div>
                                    <div className= {styles.boxClient}>
                                        Cliente:{documentos.data().cliente}
                                    </div>

                                </div>
                            </div>

                            <div className={styles.buttonKitchen}>
                                <button
                                    onClick={() => enviarPedidoEntregado((documentos.data()), documentos.id)}
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