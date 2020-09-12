import React, { useState, useEffect } from 'react';
import styles from './Waiter.module.css';

const ItemPostres = (props) => {
  const [postresData, setPostresData] = useState([]);
  const [itemMenuClicked, setItemMenuClicked] = useState({});

  const getPostresData = () => {
    fetch('data/Postres.json')
      .then(response => response.json())
      .then(data => setPostresData(data));
  };

  const manejardorClick = (itemClicked) => {
    setItemMenuClicked(itemClicked);
    props.enviarOrdenes(itemClicked);
  };

  useEffect(() => {
    getPostresData();
  }, []);

  return (
    postresData.map(item => {
      return (
        <div
          onClick={() => manejardorClick(item)}
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

export default ItemPostres;