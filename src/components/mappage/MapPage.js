import React from 'react';
import '../../App.css';
import ParkHere from "./button/Button";
import Map from "./map/Map";
import Button from "./button/Button";

function MapPage() {
    return (
        <div>
            <header className="App-header">
                <Map/>
                <Button/>
            </header>
        </div>
    );
}

export default MapPage;
