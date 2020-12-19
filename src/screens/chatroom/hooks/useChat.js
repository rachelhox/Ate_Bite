import Axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

const NEW_CHAT_MESSAGE_EVENT= 'newChatMessage'; //name of the event 
const NEW_FEED_MESSAGE_EVENT= 'newFeedMessage';
const SERVER_URL='http://localhost:4000'

// const user_Id = window.localStorage.getItem(userId)
// console.log(user_Id)

const UseChat = (roomId) => {
    
    const [messages, setMessages] = useState([]); //sent and received messages
    const socketRef = useRef();
 

    useEffect(()=>{
        //creates a WebSocket connection
      socketRef.current = socketIOClient(SERVER_URL, {
            query: { roomId }, 
            transports: ['websocket'],
        });
        
        //listens for previous messages, when someone joins the room, use the sockerRef.current.on code below but make it for checking previous messages by querying the DB using room_id which should be in the URL. UseEffect is like onload, so it should run it in here.

        Axios.post(`${SERVER_URL}/chatroom/existing`, { roomId })
        .then(function (response){
            console.log(response.data[0])
            for (let i = 0; i < response.data.length; i++) {
                console.log(response.data[i].message)
                let incomingInfo = response.data[i]
                setMessages((messages)=> [...messages, incomingInfo]);
              }
        })

        //listens for incoming messages
        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message)=>{ 
            //  console.log(message)
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.current.id,
            }
            setMessages((messages)=> [...messages, incomingMessage]);
            // console.log(incomingMessage)
        });

        //destroys socket reference when connection is closed
        return ()=> {
            socketRef.current.disconnect();
        };
    }, []);

    //sends a message to the server that forwards it to all the users in the same room
    const sendMessage = (messageBody) => {
        // let addSpaces = messageBody.replaceAll('\n','\s');
        // console.log(addSpaces)
        // console.log(messageBody)
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT,{
            message: messageBody,
            rooms_id: roomId,
            senderId: socketRef.current.id,
        });
        //this is actually an issue, because if the message fails to upload to the db and so gives an error, this will still emit to the feed. this will do for now, but later need to have this emitting once the message is received, not on sent- can put received into variable like this sendMessage, put the below emit into it and return the variable?
        socketRef.current.emit(NEW_FEED_MESSAGE_EVENT,{
            body: `${socketRef.current.id} has sent a message`,
            senderId: socketRef.current.id,
        });
    };
    
    
    return { messages, sendMessage };
};

export default UseChat;