import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { toast } from "react-toastify";

// for socket
const NEW_VOTE_MAP_EVENT= 'newVotingOptionFromMap';
const NEW_FEED_MAP_RESTO_EVENT = 'newFeedMapRestoEvent';
const ENDPOINT = process.env.REACT_APP_SERVER_URL;

const useSendResto = (roomcode, userId) => {
    const socketRef = useRef();
    const socketFeed = useRef();
    useEffect(() => {
        socketRef.current = socketIOClient(ENDPOINT + "/voting", {
                query: { roomcode },
                transports: ['websocket']
        });
        socketFeed.current= socketIOClient(ENDPOINT + "/feed", {
            query: { roomcode },
            transports: ['websocket']
    });
        socketRef.current.on(NEW_VOTE_MAP_EVENT, data => {
            // console.log(data);
            toast.success("Restaurant Added To Voting🎉");
        })

        return () => {
            socketRef.current.disconnect();
            socketFeed.current.disconnect();
        }

    }, [])

    const emitResto = (selectedCenter) => {
        console.log('from here')
        socketRef.current.emit(NEW_VOTE_MAP_EVENT, {
            resto: selectedCenter.name,
            address: selectedCenter.address,
            roomcode: roomcode,
            senderId: userId,
        });
        // for adding an event on livefeed
        socketFeed.current.emit(NEW_FEED_MAP_RESTO_EVENT, {
            userId: userId,
            roomcode: roomcode,
        });

    }

    return { emitResto };
}

export default useSendResto;