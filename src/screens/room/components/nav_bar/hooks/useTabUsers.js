import Axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

const NEW_TAB_EVENT= 'newTabOption';
// const NEW_FEED_MESSAGE_EVENT= 'newFeedTabOption'; I think its unneeded to put if users have accessed a different tab in the livefeed if its just gonna show the userpics under each tab 

// const users_id = window.localStorage.getItem('userId') keeping this in if we change to use local storage
const gettingParams = window.location.href.replaceAll("/", " ").split(" ");
  const users_id = gettingParams[gettingParams.length-1]

const useTabUsers = (roomcode) => {
    const [tabUsers, setTabUsers] = useState([]);
    const socketRef = useRef();

    //tab: 0 here cos the useState default is 0, if we change it later then needs to change this as well
    useEffect(() => {
      Axios.post(`${process.env.REACT_APP_SERVER_URL}/tab/existing`, { roomcode, users_id, tab: 0})
      .then(function (response) {
        // console.log(response.data)
        setTabUsers([...response.data])
      });
    }, []);

    useEffect (()=> {

        socketRef.current = socketIOClient(process.env.REACT_APP_SERVER_URL + '/tab', {
            query: { roomcode },
            transports: ["websocket"],
          });

          socketRef.current.on(NEW_TAB_EVENT, (data) => {
            // console.log(data);
             setTabUsers([...data]);
          });

          return () => {
            socketRef.current.disconnect();
          };

    }, [tabUsers])

//  console.log(tabUsers)
    const sendTabUsers = (data) => {
        // console.log(data);
        socketRef.current.emit(NEW_TAB_EVENT, {
          tab:data,
          users_id,
          roomcode
        });
      };

      return { tabUsers, sendTabUsers }

}

export default useTabUsers;