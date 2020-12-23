import styled from "styled-components";

export const ChatroomCSS = styled.div`
  height: 100vh;
  width: 50%;

  .chatroom {
    width: 23rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .chatContainer {
    // position: fixed;
    margin: 1rem;
    height: 35rem;
    width: 20rem;
    overflow: scroll;
  }
  .messagesContainer{
    min-height: 25rem;
    overflow: auto;
    // border: 1px solid black;
    border-radius: 1rem 1rem 0rem 0rem;
}
.messagesList{
    display: flex;
    flex-direction: column;
    list-style-type: none;
    padding: 0;
}
// .newMessageInputField{
//     height: 6.25rem;
//     width: 20rem;
//     font-size: 1.25rem;
//     padding: 0.4rem;
//     border-radius: 0rem 0rem 1rem 1rem;
// }
.messageItem{
  display: flex;
  padding: 0.5rem;
  margin: 0.4rem;
  border-radius: 0.5rem;
  color: white;
}
.myMessage{
    align-items: flex-end;
    flex-direction: column;
    background-color: rgb(49 162 76);
    white-space: pre;
}
.receivedMessage{
  justify-content: flex-start;
  flex-direction: column;
  background-color: rgb(123 123 123);
  white-space: pre;
}
.sendMessageButton{
  height: 6.25rem;
  width: 3rem;
}
.chat-text {
  margin-bottom: 0rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
}
.chat-hr {
  box-shadow: 0 20px 5px -20px rgba(165,55,253);
}
.chat-bottom {
  width: 23rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.MuiFilledInput-root {
  width: 16rem;
  margin-right: 0.5rem;
}

`;