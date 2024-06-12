import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import ParkingPage from './components/parkingpage/ParkingPage';
import HomePage from './components/homepage/HomePage'; // 가정: 홈 페이지 컴포넌트

function MainLayout() {
    const entrance = "입   차   하   기";
    const exit = "출   차   하   기";

    return (
        <div>
            <div className="mark-layout">

            </div>
            <div className="button-layout">
                <div>
                    <Link to="/entrance">
                        <button className="button-style entrance-button">{entrance}</button>
                    </Link>
                </div>
                <div>
                    <Link to="/exit">
                        <button className="button-style exit-button">{exit}</button>
                    </Link>
                </div>
                <div className="horizon-layout">
                    <Link to="/ticket">
                        <button className="button-style ticket-button">주차권 발행하기<br/>(요금 정산)</button>
                    </Link>
                    <Link to="/info">
                        <button className="button-style app-info-button">앱 정보</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<MainLayout/>}/>
                    <Route path="/entrance" element={<ParkingPage/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
