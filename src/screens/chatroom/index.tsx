import React from "react";
// import Head from "next/head";
// import { NavBar } from "@components";
import { ChatroomCSS } from "./styles";
import useChat from './hooks/useChat'

const Chat = (props) => {
  
    // const { roomId } = 'test'; //getting roomID from URL
    const roomId = '13'
    const { messages, sendMessage } = useChat(roomId); //creates a websocket and manages messaging
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
        <h1 className='roomName'>Room: {roomId}</h1>
        <div className='messagesContainer'>
          <ol className='messagesList'>
            <div className='messagesPosition'>
            {messages.map((message, i)=>(
              <li
                key={i}
                className={`messageItem ${
                  message.ownedByCurrentUser ? 'myMessage' : 'receivedMessage'
                }`}>
                  {message.message}
                </li>
            ))}
            </div>
          </ol>
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
      </div>
     </ChatroomCSS>
    );
  };
  
  export default Chat;
