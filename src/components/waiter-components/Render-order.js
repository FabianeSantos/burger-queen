
import React, { useEffect, useState } from 'react';
import styles from './Waiter.module.css';
import firebase from "../../firebase/Firebase";
import AdicionalesComponent from './Adicionales/Adicionales';
import basurero from '../../img/basurero.png';
import editaPedido from '../../img/editarPedido.png';


const RenderOrder = (props) => {

    const [cantidadItemIngresado, setcantidadItemIngresado] = useState(1);
    const [totalPedidoIngresado, setTotalPedidoIngresado] = useState(0);


    const [idPedido, setIdPedido] = useState('');

    const [nameClientIngresado, setNameClientIngresado] = useState('');
    const [tableClientIngresado, setTableClientIngresado] = useState('');


    const [ordenConAdicionales, setOrdenConAdicionales] = useState(null);


    const ref = firebase.firestore().collection('ordenes');


    const getQuerySnapshotFirebase = () => {
        ref
            .onSnapshot({ includeMetadataChanges: true }, (querySnapshot) => {

                querySnapshot.forEach((doc) => {

                });

                const numeroPedidos = querySnapshot.docs.length;
                setIdPedido('Pedido #' + (numeroPedidos + 1));
                let source = querySnapshot.metadata.fromCache ? "local cache" : "server";
               

            });
    }

    const addOrderFirebase = () => {
        const ordenesAEnviar = props.ordenesTraidas.map(orden => {
            return {
                cantidad: 1,
                nombre: orden.nombreItem,
                precio: orden.precioItem,
                adicionales: orden.adicionalesSeleccionados,
                observaciones: orden.observaciones

            }
        });
        return ref.add(
            {
                orden: ordenesAEnviar,
                cliente: nameClientIngresado,
                mesa: tableClientIngresado,
                id: idPedido
            }

        );
    }


    const btnEnviarPedido = () => {
        if (nameClientIngresado === "" || tableClientIngresado === "") {
            alert('Por favor ingresar datos del Pedido');
        } else {
            addOrderFirebase().then(() => {

                setTableClientIngresado('');
                setNameClientIngresado('');
                props.limpiarEstadoOrden();

            })
            console.log('se envio');
        }
    }

    const captureValueTable = (event) => {
        setTableClientIngresado(event.target.value);
    }

    const captureValueClient = (event) => {
        setNameClientIngresado(event.target.value);
    }


    const eliminarItemPedido = (index) => {
        props.eliminarItemPedido(index);
    }

    const limpiarInput = () => {
        setTableClientIngresado('');
        setNameClientIngresado('');
        props.limpiarEstadoOrden();
        setTotalPedidoIngresado(0);
    }

    const editarItemPedido = (orden, index) => {
        setOrdenConAdicionales({ orden, index });
    }

    const actualizarAdicionales = (orden, adicionales, notas, index) => {
        props.actualizarAdicionalesOrdenes(orden, adicionales, notas, index);
        setOrdenConAdicionales(null);
    }

    const calcularOrdenConAdicionales = (orden) => {
        const reducer = (accumulator, currentValue) => accumulator + currentValue.precio;
        const sumaTotalOrdenes = orden.adicionalesSeleccionados.reduce(reducer, 0);

        return sumaTotalOrdenes + orden.precioItem;
    }

    useEffect(() => {
        getQuerySnapshotFirebase();
    }, []);

    //Se actualiza total pedido
    useEffect(() => {
        let total = 0;
        props.ordenesTraidas.forEach(orden => {
            total = total + calcularOrdenConAdicionales(orden);
        });

        setTotalPedidoIngresado(total);
    }, [props.ordenesTraidas]);

    return (
        <div className={styles.sectionRenderPedido}>
            <div className={styles.tabla}>
                <h1>Pedidos</h1>

                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th></th>
                                <th>ITEM</th>
                                <th>CANTIDAD</th>
                                <th>PRECIO</th>
                                <th></th>
                            </tr>
                            {
                                props.ordenesTraidas.map((orden, index) => {
                                    return (
                                        <tr key={index} className={styles.boxTable}>
                                            <td><img src={editaPedido} alt="" onClick={() => editarItemPedido(orden, index)} className={styles.btnIcon} /></td>
                                            <td>{orden.nombreItem}</td>
                                            <td>{cantidadItemIngresado}</td>
                                            <td>$ {calcularOrdenConAdicionales(orden)}</td>
                                            <td><img src={basurero} alt="" onClick={() => eliminarItemPedido(index)} className={styles.btnIcon} /></td>
                                        </tr>
                                    );
                                })
                            }

                        </tbody>
                    </table>

                    < h2 > Total: $ {totalPedidoIngresado}</h2>
                </div>
            </div>

            <div className={styles.sectionDatosCliente}>
                <h2>Numero de Pedido:</h2>
                <input
                    className={styles.inputCliente}
                    defaultValue={idPedido}
                />
                <h2>Mesa:</h2>
                <select onChange={captureValueTable}
                    className={styles.inputCliente}
                    value={tableClientIngresado}>

                    <option>Elija mesa</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>

                <h2>Cliente:</h2>
                <input type='search'
                    onChange={captureValueClient}
                    className={styles.inputCliente}
                    value={nameClientIngresado}
                />
            </div>
            <div className={styles.sectionBtns}>
                <button onClick={btnEnviarPedido} className={styles.buttonBase}>Enviar Pedido</button>
                <button onClick={limpiarInput} className={styles.btnAlert}>Eliminar Pedido</button>
            </div>
            {ordenConAdicionales && <AdicionalesComponent
                actualizarAdicionales={actualizarAdicionales}
                orden={ordenConAdicionales.orden}
                index={ordenConAdicionales.index}
            />
            }

        </div >
    );
}


export default RenderOrder;