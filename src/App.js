import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import MapPage from './components/mappage/MapPage';
import ParkingPage from './components/parkingpage/ParkingPage';
import sejongImage from './img/sejong-univ.jpg';
import HomePage from './components/homepage/HomePage'; // 가정: 홈 페이지 컴포넌트

function MainLayout() {
    const entrance = "입   차   하   기";
    const exit = "출   차   하   기";

    return (
        <div>
            <div className="mark-layout">
                <img src={sejongImage} alt="sejong-univ" className="sejong-image"/>
                <div className="title">
                    <span>Sejong Univ Parking Helper<br/>(어플 이름 변경할 것)</span>
                </div>
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
                        <button className="button-style ticket-button">주차 요금<br/>계산하기</button>
                    </Link>
                    <Link to="/info">
                        <button className="button-style app-info-button">내 프로필 보기</button>
                    </Link>
                </div>
            </div>
            <div className="single-button-layout">
                <div>
                    <Link to="/map">
                        <button className="button-style map-button">내 주변 주차장 보기</button>
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
                    <Route path="/entrance" element={<MapPage/>}/>
                    <Route path="/entrance/parking" element={<ParkingPage/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
