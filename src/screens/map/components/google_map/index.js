import React, { useState, useEffect, useCallback, useRef } from "react";
import { GoogleMapCSS } from "./styles";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import socketIOClient from "socket.io-client";
import SearchBox from "../search_box";

// for socket
const ENDPOINT = "http://127.0.0.1:4000";
const socket = socketIOClient(ENDPOINT, {transports: ['websocket']}); 

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
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API,
        libraries,
    });

    // markers invoked by user click event
    const [markers, setMarkers] = useState([]);

    const handleClick = (event) => {
        // we have to emit user id from here too so when rendering markers we can retrieve
        // the user icon for markers
        // this should be the data sent to backend
        // {
        //     lat: event.latLng.lat(),
        //     lng: event.latLng.lng(),
        //     userId: userId,
        // }

        // when render (?)
        // {markers.map((marker, i) => 
        // (<Marker
        //     key={i}
        //     position={{ lat: marker.lat, lng: marker.lng }}
        //     icon={{
        //     url: "icon link", (?)
        //     scaledSize: new window.google.maps.Size(30, 30),
        //     origin: new window.google.maps.Point(0, 0),
        //     anchor: new window.google.maps.Point(15, 15) 
        //     }}
        // />))
        // }
        socket.emit('marker', event.latLng);
    }

    const onMapClick = useCallback(handleClick, []);

    socket.on('marker', data => {
        // console.log(data);
        setMarkers(markers.concat(data));
    })

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    if (loadError) return "Error loading map";
    if (!isLoaded) return "Loading map";

    return (
        <div>
            <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={8}
            center={center}
            options={options}
            onClick={onMapClick}
            onLoad={onMapLoad}
            >
            <SearchBox />
            {markers.map((marker, i) => 
                (<Marker
                    key={i}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    icon={{
                        url: "https://robohash.org/python",
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