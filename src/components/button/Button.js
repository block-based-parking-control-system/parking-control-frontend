import React, {useEffect, useState} from 'react';
import './Button.css';

const EntranceOrExit = () => {
    const [sse, setSse] = useState(null);

    const handleClick = () => {
        if (!sse) {
            const eventSource = new EventSource('http://localhost:8080/api/car/entrance');
            setSse(eventSource);

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
            };
        } else {
            sse.close();
            setSse(null);
        }
    };

    useEffect(() => {
        return () => {
            if (sse) {
                sse.close();
            }
        };
    }, [sse]);

    return (
        <button className="park-button" onClick={handleClick}>입 차</button>
    )
}

export default EntranceOrExit;