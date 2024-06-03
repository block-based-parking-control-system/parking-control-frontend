import React from 'react';
import './ParkingLot.css'

const ParkingLot = () => {
    const rows = 11;
    const cols = 7;

    const createGrid = () => {
        let grid = [];
        for (let i = 1; i <= rows; i++) {
            let row = [];

            if ([3, 6, 9].includes(i)) {
                for (let j = 0; j < cols; j++) {
                    if ([1, 2, 4, 5].includes(j)) {
                        let section = [];
                        for (let k = 1; k <= 8; k++) {
                            section.push(<div key={`${i}-${j}-${k}`} className="inline-block-parking-space"></div>);
                        }
                        row.push(<div key={`${i}-${j}`} className="edge-block-section">{section}</div>);
                    } else {
                        row.push(<div key={`${i}-${j}`} className="middle-block-section moving-section"></div>);
                    }

                }
            } else {
                for (let j = 0; j < cols; j++) {
                    row.push(<div key={`${i}-${j}`} className="middle-block-section moving-section"></div>);
                }
            }

            grid.push(<div key={i} className="grid-row">{row}</div>);
        }
        return grid;
    };

    const createUpperParkingSpace = () => {
        let row = [];
        for (let i = 0; i < cols; i++) {
            let section = [];
            for (let j = 1; j <= 4; j++) {
                section.push(<div key={`0-${i}-${j}`} className="inline-block-parking-space"></div>);
            }
            row.push(<div key={`0-${i}`} className="edge-block-section">{section}</div>);
        }

        return row;
    }

    const createLowerParkingSpace = () => {
        let row = [];
        for (let i = 0; i < cols; i++) {
            let section = [];
            for (let j = 1; j <= 4; j++) {
                section.push(<div key={`12-${i}-${j}`} className="inline-block-parking-space"></div>);
            }
            row.push(<div key={`12-${i}`} className="edge-block-section">{section}</div>);
        }

        return row;
    }

    return (
        <div>
            <div className="edge-parking-lot">
                {createUpperParkingSpace()}
            </div>
            <div className="middle-parking-lot">
                {createGrid()}
            </div>
            <div className="edge-parking-lot">
                {createLowerParkingSpace()}
            </div>
        </div>
    );
};

export default ParkingLot;
