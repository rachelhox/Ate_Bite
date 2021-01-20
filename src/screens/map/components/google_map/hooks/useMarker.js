import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import axios from "axios";

// for socket
const MARKER = 'marker';
const NEW_FEED_MARKER_EVENT = 'newFeedMarkerEvent';
const ENDPOINT = process.env.REACT_APP_SERVER_URL; 

const useMarker = (roomcode) => {
    const [markers, setMarkers] = useState([]);
    const [first, setFirst] = useState(false);
    const socketRef = useRef();
    useEffect(() => {
        // get markers previously added to the map
        axios.get(`${process.env.REACT_APP_SERVER_URL}/existingMarkers/${roomcode}`).then((data) => {
            // console.log(data.data);
            if (data.data.length > 0) {
                // console.log('true');
                setFirst(true);
            }
            if (first === true) {
                // console.log('markers set');
                setMarkers(data.data);
            }
        })

    }, [first])

    useEffect(() => {
        socketRef.current = socketIOClient(ENDPOINT + '/map', {
            query: { roomcode },
            transports: ['websocket']
        });

        socketRef.current.on(MARKER, data => {
            // console.log(data);
            setMarkers(data);
            console.log(markers);
        })

        return () => {
            socketRef.current.disconnect();
        }        
    }, [markers])

    const emitMarker = (event, userId) => {
        // for adding marker on map
        socketRef.current.emit(MARKER, {
            userId: userId,
            roomcode: roomcode,
            location: event.latLng
        });
        // for adding an event on livefeed
        socketRef.current.emit(NEW_FEED_MARKER_EVENT, {
            userId: userId,
            roomcode: roomcode,
        });
    }
    

    return { markers, emitMarker };
};

export default useMarker;

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
// socket.emit('marker', event.latLng);