import React from "react";
// import Head from "next/head";
// import { NavBar } from "@components";
import { ChatroomCSS } from "./styles";
import useChat from "./hooks/useChat";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Chat = () => {
  // const gettingParams = window.location.href.replaceAll("/", " ").split(" ");
  // const roomcode = gettingParams[gettingParams.length-2];
  // // get user id
  // const users_id = gettingParams[gettingParams.length-1];

  const roomcode = localStorage.getItem("roomcode");
  const users_id = localStorage.getItem("userId");

  const { messages, sendMessage, messagesEndRef } = useChat(roomcode); //creates a websocket and manages messaging
  const [newMessage, setNewMessage] = React.useState(""); //setting the messages to be sent

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  // const onKeyPress= (e) => {
  //   if (e.key === 'Enter') {
  //     sendMessage(newMessage);
  //     setNewMessage('');
  //   }
  // }

  return (
    <ChatroomCSS>
      <div className="chatroom">
        <div className="chatContainer">
          {/* <h1 className='roomName'>Room: {roomcode}</h1> */}
          <div className="messagesContainer">
            <ol className="messagesList">
              <div className="messagesPosition">
                {messages.map((message, i) => {
                  return message.users_id == users_id ? (
                    <>
                      <div id="myM">
                        <li
                          key={i}
                          style={{
                            backgroundColor: `${message.piccolour}`,
                            boxShadow: `20px 20px 20px -20px ${message.piccolour}`,
                            // boxShadow: `0px 0px 0px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 10px 8px 0px ${message.piccolour}`,
                          }}
                          className={`messageItem myMessage`}
                        >
                          <h6 className="chat-text">{message.username}</h6>
                          <hr className="chat-hr" />
                          <h2 className="chat-text">{message.message}</h2>
                          <h6 className="chat-text">{message.time}</h6>
                        </li>
                        <div
                          className="mypropic"
                          style={{ backgroundColor: `${message.piccolour}` }}
                        >
                          <img src={message.propic} alt="profile" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div id="myM">
                      <div
                        className="propic"
                        style={{ backgroundColor: `${message.piccolour}` }}
                      >
                        <img src={message.propic} alt="profile" />
                      </div>
                      <li
                        style={{
                          backgroundColor: `${message.piccolour}`,
                          boxShadow: `20px 20px 20px -20px ${message.piccolour}`,
                        }}
                        key={i}
                        className={`messageItem receivedMessage`}
                      >
                        <h6 className="chat-text">{message.username}</h6>
                        <hr className="chat-hr" />
                        <h2 className="chat-text">{message.message}</h2>
                        <h6 className="chat-text">{message.time}</h6>
                      </li>
                    </div>
                  );
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
            placeholder="Write message..."
            variant="filled"
            onChange={handleNewMessageChange}
          />
          {/* <button onClick={handleSendMessage} className='sendMessageButton'>
                Send
              </button> */}
          <Button
            variant="contained"
            disabled={!newMessage}
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
