import { useEffect, useRef, useState } from 'react'
import socketIOClient from 'socket.io-client'

const NEW_FEED_MESSAGE_EVENT= 'newFeedMessage'; //name of the event 
const SOCKET_SERVER_URL='http://localhost:4000'

const UseFeed =(roomId) => {

    const [feedMessages, setMessages] = useState([]); //sent and received messages
    const socketRef = useRef();

    useEffect(()=>{
        //creates a WebSocket connection
      socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { roomId }, 
            transports: ['websocket'],
        });

        //listens for incoming messages
        socketRef.current.on(NEW_FEED_MESSAGE_EVENT, (message)=>{ 
            //  console.log(message)
            const incomingMessage = {
                ...message,
            }
            setMessages((feedMessages)=> [...feedMessages, incomingMessage]);
            // console.log(incomingMessage)
        });

        //destroys socket reference when connection is closed
        return ()=> {
            socketRef.current.disconnect();
        };
    }, []);

    //sends a message to the server that forwards it to all the users in the same room
    // const sendMessage = (messageBody) => {
    //     // let addSpaces = messageBody.replaceAll('\n','\s');
    //     // console.log(addSpaces)
    //     // console.log(messageBody)
    //     socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT,{
    //         body: messageBody,
    //         senderId: socketRef.current.id,
    //     });
    // };
    
    return { feedMessages };
};

export default UseFeed;