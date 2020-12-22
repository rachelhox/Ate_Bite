import Axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

const NEW_COUNT_EVENT= 'newCountOption';
const NEW_FEED_MESSAGE_EVENT= 'newFeedCountOption';
const SERVER_URL='http://localhost:4000' 

const users_id = window.localStorage.getItem('userId')

const UseCount = (roomcode) => {
    
    const [addCount, setAddCount] = useState([]);

    const socketRef = useRef();

    useEffect(()=>{
        //creates a WebSocket connection
      socketRef.current = socketIOClient(SERVER_URL, {
            query: { roomcode }, 
            transports: ['websocket'],
        });

        // Axios.post(`${SERVER_URL}/voting/existing`, { roomcode })
        // .then(function (response){
        //     // console.log(response.data[0])
        //     for (let i = 0; i < response.data.length; i++) {
        //         // console.log(response.data[i].resto)
        //         let incomingInfo = response.data[i]
        //         setVoteOption((votingOption)=> [...votingOption, incomingInfo]);
        //       }
        // })

        // listens for incoming votingOption
        socketRef.current.on(NEW_COUNT_EVENT, (count)=>{ 
            const incomingCount = {...count}
            setAddCount((count)=> [...count, incomingCount]);

            // socketRef.current.emit(NEW_FEED_MESSAGE_EVENT,{
            //     body: `${socketRef.current.id} has made a new option to vote on`,
            //     senderId: socketRef.current.id,
            // });
        });

        //destroys socket reference when connection is closed
        return ()=> {
            socketRef.current.disconnect();
        };
    }, []);

    const sendCount = (addCount) => {
        console.log(addCount)
        socketRef.current.emit(NEW_COUNT_EVENT,{
            addCount,
            roomcode,
            users_id,
        });
     
    };
    
    
    return { addCount, sendCount };
};

export default UseCount;