import React, { useState, useEffect } from 'react';
import styles from './Waiter.module.css';

const ItemMenu = (props) => {

  const [menuData, setMenuData] = useState([]);
  const [indexItem, setIndexItem] = useState([]);

  const getDataMenu = () => {
    fetch('data/Menu.json')
      .then(response => response.json())
      .then(data => setMenuData(data));
  };

  const handleClick = (item) => {
    setIndexItem(item);
    props.enviarOrdenes(item);
  };

  useEffect(() => {
    getDataMenu();
  }, []);

  return (
    menuData.map((item) => {
      return (
        <div
          onClick={() => handleClick(item)}
          key={item.id}
          className={styles.box}>
          <div className={styles.card}>
            <img src={item.img} alt="" className={styles.imgItemMenu} />
            <h3>{item.nombre}</h3>
          </div>
        </div>
      );
    }
    )
  )
};

export default ItemMenu;