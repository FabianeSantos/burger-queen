import React, { useState, useEffect } from 'react';
import styles from './Waiter.module.css';
import { ModalDescripcionItem, useModal } from '../Modales/Modal-item';

const ItemMenu = (props) => {

  const [menuData, setMenuData] = useState([]);

  const getDataMenu = () => {
    fetch('data/Menu.json')
      .then(response => response.json())
      .then(data => setMenuData(data));
  };

  useEffect(() => {
    getDataMenu();
  }, []);


  return (
    menuData.map((item) => {
      return (
        <div key={item.id}>
          <ItemMenuConModal
            item={item}
            enviarOrdenes={props.enviarOrdenes}
          />
        </div>
      )
    }
    )
  )
};


const ItemMenuConModal = (props) => {
  const [styleModal, showModal, hideModal] = useModal();

  const handleClick = () => {
    props.enviarOrdenes(props.item);
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className={styles.box}>
        <div className={styles.card}>
          <img src={props.item.img} alt="" className={styles.imgItemMenu} />
          <h3 className={styles.tituloItemMenu}>{props.item.nombre}</h3>
        </div>
      </div>
      <div>
        <p onClick={showModal} className={styles.titulosGrey}>Ver más...</p>
        <div>
          {
            <ModalDescripcionItem
              styleModal={styleModal}
              itemMostrado={props.item}
              cerrarModalDescripcion={hideModal}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default ItemMenu;
