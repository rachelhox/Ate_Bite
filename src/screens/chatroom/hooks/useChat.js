import Axios from 'axios';

import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';


const NEW_CHAT_MESSAGE_EVENT= 'newChatMessage'; //name of the event 
const NEW_FEED_MESSAGE_EVENT= 'newFeedMessage';
const SERVER_URL='http://localhost:4000'

// const users_id = window.localStorage.getItem('userId')
// console.log('original users ID:' + users_id)
// console.log(typeof(users_id))

// get data from url
const gettingParams = window.location.href.replaceAll("/", " ").split(" ");
// get user id
const users_id = gettingParams[gettingParams.length-1];

const UseChat = (roomcode) => {
    
    const [messages, setMessages] = useState([]); //sent and received messages
    const socketRef = useRef();
 

    useEffect(()=>{
        //creates a WebSocket connection
      socketRef.current = socketIOClient(SERVER_URL, {
            query: { roomcode }, 
            transports: ['websocket'],
        });

        Axios.post(`${SERVER_URL}/chatroom/existing`, { roomcode })
        .then(function (response){
            // console.log(response.data[0])
            for (let i = 0; i < response.data.length; i++) {
                
                let incomingInfo ={...response.data[i],
                    ownedByCurrentUser:response.data[i].users_id == users_id,
                }
                // console.log(incomingInfo)
                setMessages((messages)=> [...messages, incomingInfo]);
              }
        })

        //listens for incoming messages
        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message)=>{ 
             console.log(message.users_id)
            //trying to get the relative time display working, but it isn't required and isn't working so will skip for now
            //  let relativeTime = moment(message.time, 'DD/MM/YY  h:mma').fromNow()
            //  console.log(relativeTime)
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.users_id === users_id,
            }
            setMessages((messages)=> [...messages, incomingMessage]);

        //actually gonna get rid of this for messages, but will keep it here for now to remember to put it into other things later
        socketRef.current.emit(NEW_FEED_MESSAGE_EVENT,{
                body: `${message.username} has sent a message`,
                username: message.username,
                propic: message.propic,
                piccolour: message.piccolour

            });
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
            roomcode,
            users_id,
        });
    };  
    
    
    return { messages, sendMessage };
};

export default UseChat;