import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './Map.css';
import {Link} from "react-router-dom";
import {findAllByDisplayValue} from "@testing-library/react";
import {useNavigate} from 'react-router-dom';
import Modal from '../modal/Modal';

const CustomOverlayContent = () => {
    <div className="custom-overlay">
        <div className="overlay-title">세종대학교 대양 AI 센터 지하주차장</div>
        <div className="overlay-description">103/152</div>
        <Link to="/entrance/parking">
            <button className="overlay-button">여기에 주차하기</button>
        </Link>
    </div>
}

const Map = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);

    useEffect(() => {
        const loadScript = () => {
            const script = document.createElement('script');
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=55c1317b83c5f4614a5f5246f59a82e1&autoload=false`;
            script.async = true;
            script.onload = () => {
                console.log('Kakao Map script loaded');
                window.kakao.maps.load(() => {
                    console.log('Kakao Map library loaded');
                    if (window.kakaoMapCallback) {
                        window.kakaoMapCallback();
                    }
                });
            };
            script.onerror = () => {
                console.error('Failed to load Kakao Map script');
            };
            document.head.appendChild(script);
        };

        const initializeMap = () => {
            if (window.kakao && window.kakao.maps) {
                console.log('Kakao Map Loaded:', window.kakao);
                const mapContainer = document.getElementById('map');
                const mapOption = {
                    center: new window.kakao.maps.LatLng(37.551406097040704, 127.07567210383807),
                    level: 3
                };
                const map = new window.kakao.maps.Map(mapContainer, mapOption);

                const markerPosition = new window.kakao.maps.LatLng(37.551406097040704, 127.07567210383807);
                const marker = new window.kakao.maps.Marker({
                    position: markerPosition
                });
                marker.setMap(map);

                const content = `
                    <div class="custom-overlay">
                        <div class="overlay-title">세종대학교 대양 AI 센터 지하주차장</div>
                        <div class="overlay-description">103/152</div>
                        <button class="overlay-button" onclick="window.navigateToParkingPage()">여기에 주차하기</button>
                    </div>
                `;
                const overlayPosition = markerPosition;

                const customOverlay = new window.kakao.maps.CustomOverlay({
                    position: overlayPosition,
                    content: content,
                    yAnchor: 1.5
                });

                customOverlay.setMap(map);
            } else {
                console.error('Kakao maps library is not loaded.');
            }
        };

        if (window.kakao && window.kakao.maps) {
            initializeMap();
        } else {
            window.kakaoMapCallback = initializeMap;
            loadScript();
        }
    }, []);

    window.navigateToParkingPage = () => {
        window.location.href = '/entrance/parking';
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="map-integration">
            <div id="map"></div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="주차장 탐색">
                <p>가장 가까운 주차장을 찾았습니다.</p>
            </Modal>
        </div>
    );
};

export default Map;
