import React from 'react';
import axios from 'axios';
import './Button.css';

const EntranceOrExit = () => {
    const handleClick = () => {
        axios.get('http://localhost:8080/api/car/entrance', {
            withCredentials: true
        })
            .then(response => console.log(response.data))
            .catch(error => console.error('Error:', error));
    };

    return (
        <button className="park-button" onClick={handleClick}>입 차</button>
    )
}

export default EntranceOrExit;