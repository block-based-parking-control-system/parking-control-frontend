import React, { useEffect } from 'react';
import './Map.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Map = () => {
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

    return (
            <div className="map-integration">
                <div id="map"></div>
            </div>
    );
};

export default Map;
