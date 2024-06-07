import React, {useContext, useState} from 'react';
import {RouteContext} from "../context/RouteContext";
import './ParkingLot.css'

const ParkingLot = () => {
    const rows = 11;
    const cols = 7;

    const {routeKeyList, parkingSpaceKey, locationKeyList} = useContext(RouteContext);

    const getSpaceClassName = (key) => {
        if (!routeKeyList.includes(key) && !locationKeyList.includes(key)) {
            return 'moving-section';
        } else if (locationKeyList.includes(key)) {
            return 'current-location';
        } else { //routeKeyList.includes(key)
            return 'entrance-route';
        }
    }

    const isParkingSpace = (key) => {
        return parkingSpaceKey === key;
    }

    const createMiddleParkingLot = () => {
        let grid = [];
        for (let i = 1; i <= rows; i++) {
            let row = [];

            if ([3, 6, 9].includes(i)) {
                for (let j = 0; j < cols; j++) {
                    if ([1, 2, 4, 5].includes(j)) {
                        let section = [];
                        for (let k = 1; k <= 8; k++) {
                            const key = `${j}-${i}-${k}`;
                            section.push(<div key={key}
                                              className={`inline-block-parking-space ${isParkingSpace(key) ? 'entrance-route' : 'parking-space'}`}></div>);
                        }
                        row.push(<div key={`${j}-${i}`}
                                      className="middle-block-section parking-section">{section}</div>);
                    } else {
                        const key = `${j}-${i}`;
                        // console.log(`entranceRouteKeyList: ${entranceRouteKeyList}`)
                        row.push(<div key={key}
                                      className={`middle-block-section ${getSpaceClassName(key)}`}></div>);
                    }

                }
            } else {
                for (let j = 0; j < cols; j++) {
                    const key = `${j}-${i}`;
                    row.push(<div key={key} className={`middle-block-section ${getSpaceClassName(key)}`}></div>);
                }
            }

            grid.push(<div key={`row${i}`} className="grid-row">{row}</div>);
        }
        return grid;
    };

    const createUpperParkingLot = () => {
        let row = [];
        for (let i = 0; i < cols; i++) {
            let section = [];
            for (let j = 1; j <= 4; j++) {
                const key = `${i}-0-${j}`;
                section.push(<div key={key}
                                  className={`inline-block-parking-space ${isParkingSpace(key) ? 'entrance-route' : 'parking-space'}`}></div>);
            }
            row.push(<div key={`${i}-0`} className="edge-block-section">{section}</div>);
        }

        return row;
    }

    const createLowerParkingLot = () => {
        let row = [];
        for (let i = 0; i < cols; i++) {
            let section = [];
            for (let j = 1; j <= 4; j++) {
                const key = `${i}-12-${j}`;
                section.push(<div key={key}
                                  className={`inline-block-parking-space ${isParkingSpace(key) ? 'entrance-route' : 'parking-space'}`}></div>);
            }
            row.push(<div key={`${i}-12`} className="edge-block-section">{section}</div>);
        }

        return row;
    }

    return (
        <div>
            <div className="edge-parking-lot">
                {createUpperParkingLot()}
            </div>
            <div className="middle-parking-lot">
                {createMiddleParkingLot()}
            </div>
            <div className="edge-parking-lot">
                {createLowerParkingLot()}
            </div>
        </div>
    );
};

export default ParkingLot;
