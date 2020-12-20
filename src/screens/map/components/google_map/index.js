import React, { useState, useEffect, useCallback, useRef } from "react";
import { GoogleMapCSS } from "./styles";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import socketIOClient from "socket.io-client";
import SearchBox from "../search_box";
import Locator from "../locator";
import useMarker from "./hooks/useMarker";


// constants for setting up the map
const libraries = ["places"];
const mapContainerStyle = {
    width: "50%",
    height: "100vh",
}
const center = {
    lat: 22.3193,
    lng: 114.1694,
}
const options = {
    disableDefaultUI: true,
    zoomControl: true,
}

export const MyMap = () => {

    // get data from url
    const gettingParams = window.location.href.replaceAll("/", " ").split(" ");
    // get roomcode
    const roomcode = gettingParams[gettingParams.length-2];
    // get user id
    const userId = gettingParams[gettingParams.length-1];


    // for socket
    const { markers, emitMarker } = useMarker(roomcode);
    
    // when click on map -> add marker
    const handleClick = (event) => {
        emitMarker(event, userId);
    }


    // for google map set up
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API,
        libraries,
    });
    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    // react google map api in-built props for clicking and adding markers functionality
    const onMapClick = useCallback(handleClick, []);


    // passed to locator
    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    if (loadError) return "Error loading map";
    if (!isLoaded) return "Loading map";

    return (
        <div>
            <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={15}
            center={center}
            options={options}
            onClick={onMapClick}
            onLoad={onMapLoad}
            >
            <SearchBox />
            <Locator panTo={panTo} />
            {markers.map((marker, i) => 
                (<Marker
                    key={i}
                    position={{ lat: marker.location.lat, lng: marker.location.lng }}
                    icon={{
                        url: marker.propic,
                        scaledSize: new window.google.maps.Size(30, 30),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15) 
                    }}
                />))
            }
            </GoogleMap>
        </div>
    );
}

export default MyMap;