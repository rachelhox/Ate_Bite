import Axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

const NEW_VOTE_EVENT= 'newVotingOption';
const NEW_FEED_MESSAGE_EVENT= 'newFeedvotingOption';
const SERVER_URL='http://localhost:4000'

const UseVoting = (roomcode) => {
    
    const [votingOption, setVoteOption] = useState([]);
    // console.log(votingOption)

    const socketRef = useRef();

    useEffect(()=>{
        //creates a WebSocket connection
      socketRef.current = socketIOClient(SERVER_URL, {
            query: { roomcode }, 
            transports: ['websocket'],
        });

        Axios.post(`${SERVER_URL}/voting/existing`, { roomcode })
        .then(function (response){
            // console.log(response.data[0])
            for (let i = 0; i < response.data.length; i++) {
                // console.log(response.data[i].resto)
                let incomingInfo = response.data[i]
                setVoteOption((votingOption)=> [...votingOption, incomingInfo]);
              }
        })

        //listens for incoming votingOption
        socketRef.current.on(NEW_VOTE_EVENT, (votingOption)=>{ 
            // console.log(votingOption)
            const incomingvotingOption = {...votingOption}
            setVoteOption((votingOption)=> [...votingOption, incomingvotingOption]);

            socketRef.current.emit(NEW_FEED_MESSAGE_EVENT,{
                body: `${socketRef.current.id} has made a new option to vote on`,
                senderId: socketRef.current.id,
            });
        });

        //destroys socket reference when connection is closed
        return ()=> {
            socketRef.current.disconnect();
        };
    }, []);

    const sendVoteOption = (votingOption) => {
        socketRef.current.emit(NEW_VOTE_EVENT,{
            resto: votingOption,
            roomcode,
        });
     
    };
    
    
    return { votingOption, sendVoteOption };
};

export default UseVoting;

//need to emit two main things. One is emit when a user enters in a place to vote on, and the second emit is when someone votes on something 