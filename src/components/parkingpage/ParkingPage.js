import React from 'react';
import '../../App.css';
import {RouteProvider} from "./context/RouteContext";
import CarInfo from "./carinfo/CarInfo";
import ParkingLot from "./parkinglot/ParkingLot";

function ParkingPage() {
    return (
        <div className="App">
            <header className="App-header">
                <RouteProvider>
                    <CarInfo/>
                    <ParkingLot/>
                </RouteProvider>
            </header>
        </div>
    );
}

export default ParkingPage;
