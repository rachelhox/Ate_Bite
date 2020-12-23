import Axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

const NEW_VOTE_EVENT= 'newVotingOption';
const NEW_COUNT_EVENT= 'newCountOption';
const NEW_FEED_MESSAGE_EVENT= 'newFeedvotingOption';
const SERVER_URL='http://localhost:4000'

const gettingParams = window.location.href.replaceAll("/", " ").split(" ");
  const users_id = parseInt(gettingParams[gettingParams.length-1])

const UseVoting = (roomcode) => {
    
    const [votingOption, setVoteOption] = useState([]);
    // console.log(votingOption)
    const socketRef = useRef();

    useEffect(()=>{
        Axios.post(`${SERVER_URL}/voting/existing`, { roomcode })
        .then(function (response){
            console.log(response.data)
                let incomingInfo = response.data
                // console.log(incomingInfo[0].vote.userID)
                // console.log(incomingInfo)
                console.log(users_id)
                let checkUsers = incomingInfo.map((value)=>{
                   return{ 
                       ...value,
                       userHasVoted: value.vote.userID.includes(users_id)
                    } 
                })
                setVoteOption(checkUsers)
        })
    },[]);

    

    useEffect(()=>{
        //creates a WebSocket connection
      socketRef.current = socketIOClient(SERVER_URL, {
            query: { roomcode }, 
            transports: ['websocket'],
        });

        socketRef.current.on(NEW_VOTE_EVENT, (data)=>{ 
            console.log(data)
            console.log(votingOption)
            let spread = [...votingOption,data]
            console.log(spread)
            setVoteOption(spread);

            // socketRef.current.emit(NEW_FEED_MESSAGE_EVENT,{
            //     body: `${socketRef.current.id} has made a new option to vote on`,
            //     senderId: socketRef.current.id,
            // });
        });

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
                console.log(userHasVoted)
                const incomingCount = {
                    ...addCount, 
                    userHasVoted
                }
                console.log(incomingCount)
                console.log(votingOption)
                let countOption = [...votingOption]
                console.log(countOption)
                for(let f = 0; f < countOption.length; f++){
                    if(countOption[f].id == incomingCount.id){
                        countOption[f] = incomingCount
                    }
                }
                console.log(countOption)
                setVoteOption(countOption);
            });

        //destroys socket reference when connection is closed
        return ()=> {
            socketRef.current.disconnect();
        };
    }, [votingOption]);

    const sendVoteOption = (votingOption) => {
        socketRef.current.emit(NEW_VOTE_EVENT,{
            resto: votingOption,
            roomcode,
        });
    };
    
    const sendCount = (data) => {
        console.log(data)
        socketRef.current.emit(NEW_COUNT_EVENT,{
            data,
            users_id,
        });
    };
    


    return { votingOption, sendVoteOption, sendCount };
};

export default UseVoting;

//need to emit two main things. One is emit when a user enters in a place to vote on, and the second emit is when someone votes on something 