import React, {useEffect, useState, useRef, useContext} from 'react';
import {RouteContext} from '../context/RouteContext';
import './Button.css';

const EntranceOrExit = () => {
    const entrance = '입          차';
    const entranceProcessing = '입    차    중';
    const exit = '출          차';
    const exitProcessing = '출    차    중';

    const [sse, setSse] = useState(null);
    const [buttonText, setButtonText] = useState(entrance); //버튼의 텍스트 관리
    const [buttonDisabled, setButtonDisabled] = useState(false); // 버튼의 활성화 상태 관리
    const buttonTextRef = useRef(buttonText); // buttonText 상태의 최신 값을 참조하는 ref

    const {updateRoute, updateParkingSpace, updateLocation, resetRoute} = useContext(RouteContext);

    const [seconds, setSeconds] = useState(0);
    const [intervalId, setIntervalId] = useState(null);

    const handleClick = () => {
        if (!sse) {
            let eventSource;
            if (buttonText === entrance) {
                eventSource = new EventSource('http://localhost:8080/api/car/entrance');
                setButtonText(entranceProcessing);
            } else {
                eventSource = new EventSource('http://localhost:8080/api/car/exit');
                setButtonText(exitProcessing);
            }

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
                setButtonText(buttonTextRef.current === entranceProcessing ? exit : entrance);
                setButtonDisabled(false);
            };
        } else {
            sse.close();
            setSse(null);
            setButtonText(buttonTextRef.current === entranceProcessing ? exit : entrance);
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
        buttonTextRef.current = buttonText; // buttonText 상태가 변경될 때마다 ref를 업데이트

        if ([entrance, exit].includes(buttonTextRef.current)) {
            alert(`${buttonTextRef.current === entrance ? '출차':'입차'}가 완료되었습니다.`);
        }
    }, [buttonText]);

    useEffect(() => {
        if ([entranceProcessing, exitProcessing].includes(buttonText)) {
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

    return (
        <div>
            <button className="park-button" onClick={handleClick} disabled={buttonDisabled}>
                {buttonText}
            </button>
            {([entranceProcessing, exitProcessing].includes(buttonText)) && <div>소요 시간: {seconds}초</div>}
        </div>
    )
}

export default EntranceOrExit;