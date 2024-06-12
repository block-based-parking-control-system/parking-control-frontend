import React from 'react';
import './CarInfo.css';
import carImage from '../../img/tesla-model-y.png'; // Add your car image to the project
import batteryImage from '../../img/battery.jpg';

const CarInfo = () => {
    return (
        <div>
            <div className="car-info">
                <img src={carImage} alt="Tesla Model Y" className="car-image"/>
                <div className="info">
                    <div className="info-item">
                        <span>Tesla Model Y</span>
                    </div>
                    <div className="info-item info-item-middle">
                        <span>중형 SUV</span>
                    </div>
                    <div className="info-item">
                        <img src={batteryImage} alt="Battery" className="battery-image"/>
                        <span>36%</span>
                    </div>
                </div>
            </div>
            <div className="location-item">
                <span>세종대학교 대양 AI 센터 지하주차장</span>
            </div>
        </div>
    )
        ;
};

export default CarInfo;
