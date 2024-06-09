import React from 'react';
import './CarInfo.css';
import carImage from '../../img/tesla-model-y.png'; // Add your car image to the project
import batteryImage from '../../img/battery.png';

const CarInfo = () => {
    return (
        <div>
            <div className="car-info">
                <img src={carImage} alt="Tesla Model Y" className="car-image"/>
                <div className="info">
                    <div className="info-item">
                        <span className="item-property">모델명</span>
                        <span>Tesla Model Y</span>
                    </div>
                    <div className="info-item">
                        <span className="item-property">차 종</span>
                        <span>중형 SUV</span>
                    </div>
                    <div className="info-item">
                        <span className="item-property">배터리</span>
                        <img src={batteryImage} alt="Battery" className="battery-image"/>
                        <span>83%</span>
                    </div>
                </div>
            </div>
            <div className="location-item">
                <span className="item-property">현재 위치</span> <span>세종대학교 대양 AI 센터 지하주차장</span>
            </div>
        </div>
    )
        ;
};

export default CarInfo;
