import React, {createContext, useState} from 'react';

export const RouteContext = createContext();

export const RouteProvider = ({children}) => {
    const [routeKeyList, setRouteKeyList] = useState([]);
    const [parkingSpaceKey, setParkingSpaceKey] = useState('');
    const [locationKeyList, setLocationKeyList] = useState([]);

    const updateRoute = (newEntranceRouteKeyList) => {
        setRouteKeyList(newEntranceRouteKeyList);
    };

    const updateParkingSpace = (newParkingSpaceKey) => {
        setParkingSpaceKey(newParkingSpaceKey);
    }

    const updateLocation = (newLocationKeyList) => {
        setLocationKeyList(newLocationKeyList);
    }

    const resetRoute = () => {
        setRouteKeyList([]);
        setParkingSpaceKey('');
        setLocationKeyList([]);
    }

    return (
        <RouteContext.Provider
            value={{
                routeKeyList,
                parkingSpaceKey,
                locationKeyList,
                updateRoute,
                updateParkingSpace,
                updateLocation,
                resetRoute
            }}>
            {children}
        </RouteContext.Provider>
    )
}