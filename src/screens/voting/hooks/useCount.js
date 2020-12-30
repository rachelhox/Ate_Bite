import Axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

const NEW_COUNT_EVENT= 'newCountOption';
const NEW_FEED_MESSAGE_EVENT= 'newFeedCountOption';
const SERVER_URL='http://localhost:4000' 

// const users_id = window.localStorage.getItem('userId')
const gettingParams = window.location.href.replaceAll("/", " ").split(" ");
  const users_id = gettingParams[gettingParams.length-1]

const UseCount = (roomcode) => {
    
    const [addCount, setAddCount] = useState([]);

    const socketRef = useRef();

    useEffect(()=>{
        //creates a WebSocket connection
      socketRef.current = socketIOClient(SERVER_URL, {
            query: { roomcode }, 
            transports: ['websocket'],
        });

        Axios.post(`${SERVER_URL}/voting/count/existing`, { roomcode })
        .then(function (response){
            // console.log(response.data)
            for (let i = 0; i < response.data.length; i++) {
                // console.log(response.data[i].resto)
                let incomingInfo = response.data[i]
                setAddCount((countOption)=> [...countOption, incomingInfo]);
              }
        })

        // listens for incoming votingOption
        socketRef.current.on(NEW_COUNT_EVENT, (addCount)=>{ 
        //    console.log(count.vote.userID)
            let voteCount = addCount.vote.userID
            // console.log(voteCount)
            let userHasVoted = false 
           
           for(let i = 0; i < voteCount.length; i++){
            if(users_id == voteCount[i]){
                console.log( voteCount[i])
                userHasVoted = true
                }
            }
            // console.log(userHasVoted)
            const incomingCount = {
                ...addCount, 
                userHasVoted
            }
            console.log(incomingCount)
            setAddCount((countOption)=>{
                console.log(countOption)
                for(let f = 0; f < countOption.length; f++){
                    if(countOption[f].id == incomingCount.id){
                        countOption[f] = incomingCount
                    }
                }
            });
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

    const sendCount = (data) => {
        // console.log(data)
        socketRef.current.emit(NEW_COUNT_EVENT,{
            data,
            users_id,
        });
     
    };
    
    
    return { addCount, sendCount };
};

export default UseCount;