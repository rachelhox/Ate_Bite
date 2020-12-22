import { useEffect, useRef, useState } from 'react'
import socketIOClient from 'socket.io-client'

const NEW_FEED_MESSAGE_EVENT= 'newFeedMessage'; //name of the event 
const NEW_FEED_MARKER_EVENT = 'newFeedMarkerEvent';
const SOCKET_SERVER_URL='http://localhost:4000'

const UseFeed =(roomcode) => {

    const [feedMessages, setMessages] = useState([]); //sent and received messages
    const socketRef = useRef();

    useEffect(()=>{
        //creates a WebSocket connection
      socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { roomcode }, 
            transports: ['websocket'],
        });

        //listens for incoming messages
        socketRef.current.on(NEW_FEED_MESSAGE_EVENT, (message)=>{ 
        // console.log(message)
        setMessages((feedMessages)=> [...feedMessages, message]);
        });

        //listens for adding marker on map
        socketRef.current.on(NEW_FEED_MARKER_EVENT, (message)=>{ 
            console.log(message)
            setMessages((feedMessages)=> [...feedMessages, message]);
        });


        //destroys socket reference when connection is closed
        return ()=> {
            socketRef.current.disconnect();
        };
    }, []);
    
    return { feedMessages };
};

export default UseFeed;