
import React, { useState, useEffect } from 'react';
import styles from './Waiter.module.css';
import logo from '../../img/logo.png';
import ItemMenu from './Item-menu';
import RenderOrder from './Render-order';
import ItemPostres from './Item-postres';
import BtnCerrarSesion from '../Button/Button';

import firebase from '../../firebase/Firebase';
import campana from '../../img/campana.png';
import PedidosMesero from './Pedidos-mesero/Pedidos-mesero';
import CurrentTime from '../Fecha/Current-date';

const WaiterView = () => {
  const [showMenu, setShowMenu] = useState('menu');
  const [ordenesPedidas, setOrdenesPedidas] = useState([]);
  const [countPedido, setCountPedido] = useState(0);

  const refListas = firebase.firestore().collection('ordenesListas');

  const getOrdenesListas = () => {
    refListas
      .onSnapshot({ includeMetadataChanges: true }, (querySnapshot) => {
        setCountPedido(querySnapshot.docs.length);

        let source2 = querySnapshot.metadata.fromCache ? "local cache" : "server";
        console.log("Data came from " + source2);
      })
  };

  useEffect(() => {
    getOrdenesListas();
  }, []);

  const updatemenu = (name) => {
    setShowMenu(name);
  };

  const actualizaEstadoOrden = (ordenRecibida) => {
    const orden = {
      id: ordenRecibida.id,
      nombreItem: ordenRecibida.nombre,
      adicionalesItem: ordenRecibida.adicionales,
      precioItem: ordenRecibida.precio,
      adicionalesSeleccionados: [],
      observaciones: ''
    };
    setOrdenesPedidas([...ordenesPedidas, orden]);
  };

  const limpiarEstadoOrden = () => {
    setOrdenesPedidas([]);
  };

  const eliminarItemPedido = (indexAEliminar) => {
    const ordenesFiltradas = ordenesPedidas.filter((orden, index) => {
      return index !== indexAEliminar;
    });
    setOrdenesPedidas(ordenesFiltradas);

    const totalOrdenesFiltradas = ordenesFiltradas.map(orden => {
      return orden.precioItem;
    })
  };

  const actualizarAdicionalesOrdenes = (ordenRecibida, adicionalesRecibidos, notasRecibidas, index) => {

    const orden = {
      id: ordenRecibida.id,
      nombreItem: ordenRecibida.nombreItem,
      adicionalesItem: ordenRecibida.adicionalesItem,
      precioItem: ordenRecibida.precioItem,
      adicionalesSeleccionados: adicionalesRecibidos,
      observaciones: notasRecibidas
    };   

    ordenesPedidas[index] = orden;
    setOrdenesPedidas([...ordenesPedidas]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.navBar}>
        <div >
          <img src={logo} className={styles.logo} alt='' />
        </div>
        <div>
          <div className={styles.datosPersonalizados}>
            <p onClick={() => updatemenu('menu')}>Menú Principal</p>
            <p onClick={() => updatemenu('postres')}>Postres</p>
            <p onClick={() => updatemenu('pedidos')}>Pedidos Listos</p>
          </div>
          <div className={styles.countbell}>
            <span>{countPedido}</span>
            <div className={styles.bell} >
              <img src={campana} className={styles.imgbell} alt=''></img>
            </div>
          </div>
          <div className={styles.fecha}>
            <CurrentTime />
          </div>
          <BtnCerrarSesion />
        </div>
      </div>
      <div className={styles.sectionMenu}>
        <div className={styles.sectionRenderMenu}>
          {showMenu === 'menu' ? <ItemMenu enviarOrdenes={actualizaEstadoOrden} /> :
            showMenu === 'postres' ? <ItemPostres enviarOrdenes={actualizaEstadoOrden} /> :
              <PedidosMesero />
          }
        </div>
      </div>
      <div className={styles.sectionOrder}>
        <RenderOrder
          ordenesTraidas={ordenesPedidas}
          limpiarEstadoOrden={limpiarEstadoOrden}
          eliminarItemPedido={eliminarItemPedido}
          actualizarAdicionalesOrdenes={actualizarAdicionalesOrdenes}

        />
      </div>
    </div >
  );
};

export default WaiterView;
