import React, {useEffect, useState, useContext} from 'react';
import {RouteContext} from '../context/RouteContext';
import './Button.css';
import Modal from '../modal/Modal';

const EntranceOrExit = () => {
    const entrance = '주  행  하  기';
    const entranceProcessing = '주    행    중';
    const entranceComplete = "주  차  완  료";

    const [sse, setSse] = useState(null);
    const [buttonText, setButtonText] = useState(entrance); //버튼의 텍스트 관리
    const [buttonDisabled, setButtonDisabled] = useState(false); // 버튼의 활성화 상태 관리

    const {updateRoute, updateParkingSpace, updateLocation, resetRoute} = useContext(RouteContext);

    const [seconds, setSeconds] = useState(0);
    const [intervalId, setIntervalId] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleClick = () => {
        if (!sse) {
            let eventSource = new EventSource('http://localhost:8080/api/car/entrance');
            setButtonText(entranceProcessing);

            setSse(eventSource);
            setButtonDisabled(true);

            eventSource.onopen = (event) => {
                console.log("Connection to server opened.");
            }

            eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data);

                if (data.type === 1) {
                    const entranceRoute = data.data.entranceRoute;
                    const parkingSpace = data.data.parkingSpace;

                    const entranceRouteKeyList = entranceRoute.map((point) => {
                        return `${point.x}-${point.y}`;
                    });
                    const parkingSpaceKey = `${parkingSpace.section.x}-${parkingSpace.section.y}-${parkingSpace.index}`

                    updateRoute(entranceRouteKeyList);
                    updateParkingSpace(parkingSpaceKey)

                    console.log(`입차 초기 데이터: ${entranceRouteKeyList}, ${parkingSpaceKey}`);
                } else if (data.type === 2) {
                    const exitRoute = data.data.exitRoute;

                    const exitRouteKeyList = exitRoute.map((point) => {
                        return `${point.x}-${point.y}`;
                    });

                    updateRoute(exitRouteKeyList);

                    console.log(`출차 초기 데이터: ${exitRouteKeyList}`);
                } else if (data.type === 3) {
                    const location = data.data.location;

                    const locationKeyList = location.map((point) => {
                        return `${point.x}-${point.y}`;
                    });

                    updateLocation(locationKeyList);

                    console.log(`현재 위치: ${locationKeyList}`);
                } else if (data.type === 4) {
                    console.log("입출차완료");
                }
                //console.log(data);
            };

            eventSource.onerror = (event) => {
                if (event.eventPhase === EventSource.CLOSED) {
                    console.log("Connection to server closed successfully");
                } else {
                    console.error("Error occurred: ", event);
                }

                resetRoute();

                eventSource.close();
                setSse(null);
                // setButtonText(buttonTextRef.current === entranceProcessing ? exit : entrance);
                setButtonText(entranceComplete);
                setButtonDisabled(false);
                setIsModalOpen(true);
            };
        } else {
            sse.close();
            setSse(null);
            // setButtonText(buttonTextRef.current === entranceProcessing ? exit : entrance);
            setButtonText(entranceProcessing);
            setButtonDisabled(false);
        }
    };

    useEffect(() => {
        return () => {
            if (sse) {
                sse.close();
            }
        };
    }, [sse]);

    useEffect(() => {
        if (buttonText === entranceProcessing) {
            const id = setInterval(() => {
                setSeconds((seconds) => seconds + 1);
            }, 1000);
            setIntervalId(id);
        } else if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
            setSeconds(0);
        }
    }, [buttonText]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button className="park-button" onClick={handleClick} disabled={buttonDisabled}>
                {buttonText}
            </button>
            {(buttonText === entranceProcessing) && <div>소요 시간: {seconds}초</div>}

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="주차 완료">
                <p>주차가 성공적으로 완료되었습니다.</p>
            </Modal>
        </div>
    )
}

export default EntranceOrExit;