import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { toast } from "react-toastify";

// for socket
const NEW_VOTE_MAP_EVENT= 'newVotingOptionFromMap';
const NEW_FEED_MAP_RESTO_EVENT = 'newFeedMapRestoEvent';
const ENDPOINT = process.env.REACT_APP_SERVER_URL;

const useSendResto = (roomcode, userId) => {
    const socketRef = useRef();
    useEffect(() => {
        socketRef.current = socketIOClient(ENDPOINT, {
                query: { roomcode },
                transports: ['websocket']
        });

        socketRef.current.on(NEW_VOTE_MAP_EVENT, data => {
            // console.log(data);
            toast.success("Restaurant Successfully Added To Voting🎉");
        })

        return () => {
            socketRef.current.disconnect();
        }

    }, [])

    const emitResto = (selectedCenter) => {
        socketRef.current.emit(NEW_VOTE_MAP_EVENT, {
            resto: selectedCenter.name,
            rooms_id: roomcode, // ????
            senderId: userId,
        });
        // for adding an event on livefeed
        socketRef.current.emit(NEW_FEED_MAP_RESTO_EVENT, {
            userId: userId,
            roomcode: roomcode,
        });

    }

    return { emitResto };
}

export default useSendResto;