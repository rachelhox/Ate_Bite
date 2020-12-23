import React from "react";
// import Head from "next/head";
// import { NavBar } from "@components";
import { ChatroomCSS } from "./styles";
import useChat from './hooks/useChat';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

const Chat = () => {
  
    // const gettingParams = window.location.href.replaceAll("/", " ").split(" ");
    // const roomcode = gettingParams[gettingParams.length-2];
    // // get user id
    // const users_id = gettingParams[gettingParams.length-1];

    const roomcode = localStorage.getItem("roomcode");
    const users_id = localStorage.getItem("userId");

    const { messages, sendMessage, messagesEndRef } = useChat(roomcode); //creates a websocket and manages messaging
    const [newMessage, setNewMessage] = React.useState(''); //setting the messages to be sent 
  
    const handleNewMessageChange = (event) => {
      setNewMessage(event.target.value);
    };

    const handleSendMessage = () => {
      sendMessage(newMessage);
      setNewMessage('');
    };
  
    // const onKeyPress= (e) => {
    //   if (e.key === 'Enter') {
    //     sendMessage(newMessage);
    //     setNewMessage('');
    //   }
    // }

    return(
      <ChatroomCSS>
        <div className="chatroom">
          <div className='chatContainer'>
            {/* <h1 className='roomName'>Room: {roomcode}</h1> */}
            <div className='messagesContainer'>
              <ol className='messagesList'>
                <div className='messagesPosition'>
                {messages.map((message, i)=>{
                  return (
                  (message.users_id == users_id ? 
                     (<div>
                      <li
                        key={i}
                        className={`messageItem myMessage`}>
                          <h2 className="chat-text">{message.username}</h2>
                          <hr className="chat-hr" />
                          <h3 className="chat-text">{message.message}</h3>
                          <h5 className="chat-text">{message.time}</h5>                         
                      </li>
                    </div>) :
                    (<div>
                    <li
                      key={i}
                      className={`messageItem receivedMessage`}>
                        <h2 className="chat-text">{message.username}</h2>
                        <hr className="chat-hr" />
                        <h3 className="chat-text">{message.message}</h3>
                        <h5 className="chat-text">{message.time}</h5>                       
                    </li>
                  </div>)            
                  ))
                })}
                </div>
                <div ref={messagesEndRef} />
              </ol>
            </div>
          </div>
            {/* <textarea
              value={newMessage}
              onChange={handleNewMessageChange}
              placeholder='Write message...'
              className='newMessageInputField'
            /> */}
          <div className="chat-bottom">
            <TextField
              id="filled-multiline-static"
              // label="Multiline"
              multiline
              rows={4}
              value={newMessage}
              placeholder='Write message...'
              variant="filled"
              onChange={handleNewMessageChange}
            />
              {/* <button onClick={handleSendMessage} className='sendMessageButton'>
                Send
              </button> */}
            <Button
                variant="contained"
                disabled ={!newMessage}
                color="primary"
                // classes={{ root: classesBtn.root }}
                onClick={handleSendMessage}
                // onKeyPress={onKeyPress}
              >
              send
            </Button>
          </div>
      </div>
     </ChatroomCSS>
    );
  };
  
  export default Chat;
