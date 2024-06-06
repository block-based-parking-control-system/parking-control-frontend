import React, {useEffect, useState, useRef} from 'react';
import './Button.css';

const EntranceOrExit = () => {
    const [sse, setSse] = useState(null);
    const [buttonText, setButtonText] = useState('입차'); //버튼의 텍스트 관리
    const [buttonDisabled, setButtonDisabled] = useState(false); // 버튼의 활성화 상태 관리
    const buttonTextRef = useRef(buttonText); // buttonText 상태의 최신 값을 참조하는 ref

    const handleClick = () => {
        if (!sse) {
            let eventSource;
            if (buttonText === '입차') {
                eventSource = new EventSource('http://localhost:8080/api/car/entrance');
                setButtonText('입차중');
            } else {
                eventSource = new EventSource('http://localhost:8080/api/car/exit');
                setButtonText('출차중');
            }

            setSse(eventSource);
            setButtonDisabled(true);

            eventSource.onopen = (event) => {
                console.log("Connection to server opened.");
            }

            eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log(data);
            };

            eventSource.onerror = (event) => {
                if (event.eventPhase === EventSource.CLOSED) {
                    console.log("Connection to server closed successfully");
                } else {
                    console.error("Error occurred: ", event);
                }

                eventSource.close();
                setSse(null);
                setButtonText(buttonTextRef.current === '입차중' ? '출차' : '입차');
                setButtonDisabled(false);
            };
        } else {
            sse.close();
            setSse(null);
            setButtonText(buttonTextRef.current === '입차중' ? '출차' : '입차');
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
    }, [buttonText]);

    return (
        <button className="park-button" onClick={handleClick} disabled={buttonDisabled}>
            {buttonText}
        </button>
    )
}

export default EntranceOrExit;