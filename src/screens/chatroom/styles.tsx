import styled from "styled-components";

export const ChatroomCSS = styled.div`
  height: 100vh;
  width: 50%;

  .chatContainer {
    // position: fixed;
    margin: 1rem;
    height: 40rem;
    width: 30rem;
  }
  .messagesContainer{
    min-height: 25rem;
    overflow: auto;
    border: 1px solid black;
    border-radius: 1rem 1rem 0rem 0rem;
}
.messagesList{
    display: flex;
    flex-direction: column;
    list-style-type: none;
    padding: 0;
}
.newMessageInputField{
    height: 6.25rem;
    width: 25rem;
    font-size: 1.25rem;
    padding: 0.4rem;
    border-radius: 0rem 0rem 0rem 1rem;
}
.messageItem{
  display: flex;
  padding: 0.5rem;
  margin: 0.4rem;
  border-radius: 0.5rem;
  color: white;
}
.myMessage{
    justify-content: flex-end;
    background-color: rgb(49 162 76);
    white-space: pre;
}
.receivedMessage{
  justify-content: flex-start;
  background-color: rgb(123 123 123);
  white-space: pre;
}
.sendMessageButton{
  height: 6.25rem;
  width: 5rem;
}
`;