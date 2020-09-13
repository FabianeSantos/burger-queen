import React, { useEffect, useState } from 'react';
// import UserName from '../sign-in-components/Nombre';
import styles from './Fecha.module.css'


const CurrentTime = () => {
    const [userActive, setUserActive] = useState('');

    const getUserActive = () => {
        const userInSetion = localStorage.getItem('user');
        console.log(userInSetion);
        setUserActive(userInSetion);
    }
    
    useEffect(() => {
        getUserActive();
    },[]);

    let date = new Date();

    let day = date.getDate();
    let month = (date.getMonth() < 10 ? '0' : '') + (date.getMonth() + 1);
    let year = date.getFullYear();

    let hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
    let minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

    return (
        <div className={styles.fecha}>
            <p>{userActive}</p>
            <p>{day}/{month}/{year}, {hours}:{minutes}hrs</p>
        </div>

    )
}

export default CurrentTime;