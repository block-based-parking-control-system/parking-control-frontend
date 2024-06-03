import React from 'react';
import './App.css';
import CarInfo from './components/carinfo/CarInfo';
import ParkingLot from './components/parkinglot/ParkingLot';
import EntranceOrExit from "./components/button/Button";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <CarInfo/>
                <ParkingLot/>
                <EntranceOrExit/>
            </header>
        </div>
    );
}

export default App;
