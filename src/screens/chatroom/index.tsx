import React from "react";
// import Head from "next/head";
// import { NavBar } from "@components";
import { ChatroomCSS } from "./styles";
import useChat from './hooks/useChat';

const Chat = () => {
  
    const gettingParams = window.location.href.replaceAll("/", " ").split(" ");
    const roomcode = gettingParams[gettingParams.length-2]
    // console.log(roomcode)

    const { messages, sendMessage } = useChat(roomcode); //creates a websocket and manages messaging
    const [newMessage, setNewMessage] = React.useState(''); //setting the messages to be sent 
  
    const handleNewMessageChange = (event) => {
      setNewMessage(event.target.value);
    };

    const handleSendMessage = () => {
      sendMessage(newMessage);
      setNewMessage('');
    };
  
    return(
      <ChatroomCSS>
      <div className='chatContainer'>
        {/* <h1 className='roomName'>Room: {roomcode}</h1> */}
        <div className='messagesContainer'>
          <ol className='messagesList'>
            <div className='messagesPosition'>
            {messages.map((message, i)=>(
              <li
                key={i}
                className={`messageItem ${
                  message.ownedByCurrentUser ? 'myMessage' : 'receivedMessage'
                }`}>
                  <h2>{message.username}</h2>
                  <h3>{message.time}</h3>

                  {message.message}
                </li>
            ))}
            </div>
          </ol>
        </div>
        </div>
          <textarea
            value={newMessage}
            onChange={handleNewMessageChange}
            placeholder='Write message...'
            className='newMessageInputField'
          />
          <button onClick={handleSendMessage} className='sendMessageButton'>
            Send
          </button>
      
     </ChatroomCSS>
    );
  };
  
  export default Chat;
