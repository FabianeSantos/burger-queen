import React, { useState } from 'react';

const UserName = () => {
    const [userName, setUsername] = useState('');

    const actualizarNameUser = (nombreIngresado) => {
        localStorage.setItem('user', nombreIngresado);
    }

    const name = (e) => {
        setUsername(e.target.value);
        actualizarNameUser(e.target.value);
    }
    console.log(userName);

    return (
        <div>
            <input type="text"
                onChange={name}
                value={userName}
            >
            </input>
        </div>
    )
}

export default UserName;