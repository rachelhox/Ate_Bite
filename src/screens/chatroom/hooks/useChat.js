import Axios from "axios";

import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; //name of the event
const NEW_FEED_MESSAGE_EVENT = "newFeedMessage";
// const users_id = window.localStorage.getItem('userId')
// console.log('original users ID:' + users_id)
// console.log(typeof(users_id))

const UseChat = (roomcode) => {
  // get data from url
  const gettingParams = window.location.href.replaceAll("/", " ").split(" ");
  // get user id
  const users_id = parseInt(gettingParams[gettingParams.length - 1]);
  // const users_id = localStorage.getItem("userId");
  
  const [messages, setMessages] = useState([]); //sent and received messages
  const socketRef = useRef();

  // for smooth scroll of chat messages and scrolling to the bottom automatically
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    Axios.post(`${process.env.REACT_APP_SERVER_URL}/chatroom/existing`, {
      roomcode,
    }).then(function (response) {
      // console.log(response.data)
      // for (let i = 0; i < response.data.length; i++) {

      //     let incomingInfo ={...response.data[i],
      //         ownedByCurrentUser:response.data[i].users_id == users_id,
      //     }
      //     // console.log(incomingInfo)
      //     setMessages((messages)=> [...messages, incomingInfo]);
      //   }
      setMessages([...response.data]);
      // console.log(messages);
    });
  }, []);

  useEffect(() => {
    //creates a WebSocket connection
    socketRef.current = socketIOClient(
      process.env.REACT_APP_SERVER_URL + "/chat",
      {
        query: { roomcode },
        transports: ["websocket"],
      }
    );

    //listens for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      // console.log(messages);
      console.log(message);
      //trying to get the relative time display working, but it isn't required and isn't working so will skip for now
      //  let relativeTime = moment(message.time, 'DD/MM/YY  h:mma').fromNow()
      //  console.log(relativeTime)
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.users_id === users_id,
      };
      setMessages((messages) => messages.concat(message));

      // arran's
      //actually gonna get rid of this for messages, but will keep it here for now to remember to put it into other things later
      // socketRef.current.emit(NEW_FEED_MESSAGE_EVENT, {
      //   body: `${message.username} has sent a message`,
      //   username: message.username,
      //   propic: message.propic,
      //   piccolour: message.piccolour,
      // });
      // console.log(incomingMessage)
    });

    //destroys socket reference when connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [messages]);

  // for smooth scroll of chat messages and scrolling to the bottom automatically
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  //sends a message to the server that forwards it to all the users in the same room
  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      message: messageBody,
      roomcode,
      users_id,
    });
    socketRef.current.emit(NEW_FEED_MESSAGE_EVENT, {
      userId: users_id,
      roomcode,
    });
  };

  return { messages, sendMessage, messagesEndRef };
};

export default UseChat;
