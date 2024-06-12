import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import ParkingPage from './components/parkingpage/ParkingPage';
import HomePage from './components/homepage/HomePage'; // 가정: 홈 페이지 컴포넌트

function MainLayout() {
    return (
        <div>
            <Link to="/parkingpage">
                <button>입차하기</button>
            </Link>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
            </Routes>
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<MainLayout/>}/>
                    <Route path="/parkingpage" element={<ParkingPage/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
