import React from 'react';
import './App.css';
import {RouteProvider} from "./components/context/RouteContext";
import CarInfo from "./components/carinfo/CarInfo";
import ParkingLot from './components/parkinglot/ParkingLot';
import EntranceOrExit from "./components/button/Button";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <RouteProvider>
                        <CarInfo/>
                        <ParkingLot/>
                        <EntranceOrExit/>
                </RouteProvider>
            </header>
        </div>
    );
}

export default App;
