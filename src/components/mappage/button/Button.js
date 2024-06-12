import React from "react";
import './Button.css';
import '../../../App.css'
import {Link} from "react-router-dom";

const ParkHere = () => {
    return (
        <div className="single-button-layout">
            <Link to="/entrance/parking">
                <button className="button-style map-button">여기에 주차하기</button>
            </Link>
        </div>
    )
}

export default ParkHere;