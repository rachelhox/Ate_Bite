import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Link from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import { RoomHomeCSS, RoomListCSS } from "./styles";
import Button from "@material-ui/core/Button";
import axios from "axios";

export const RoomHome = () => {
  const history = useHistory();
  let user: any = useParams();
  // const [inputs, setInputs] = useState({ roomname: "" });
  const [roomInfo, setRoomInfo] = useState([]);
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   console.log(event.target);
  //   setInputs((inputs) => ({
  //     ...inputs,
  //     [name]: value,
  //   }));
  // };
  // get data from url
  const gettingParams = window.location.href.replaceAll("/", " ").split(" ");
  // get roomcode
  const roomcode = gettingParams[gettingParams.length - 2];
  // get user id
  const userId = gettingParams[gettingParams.length - 1];
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/room/getRoom/${roomcode}/${userId}`
      )
      .then((data) => {
        let x = data.data;
        setRoomInfo([...x]);
      });
  }, []);
  return (
    <>
      <RoomHomeCSS>
        {roomInfo.map((x, i) => {
          return (
            <>
              {/* <Button
                onClick={() => {
                  history.push(`/room/${x.roomcode}/${user.userId}`);
                }}
                key={i}
              > */}
              <img src={x.propic} alt="" />
              <h3>{x.username}</h3>
              <br />
              <p>{x.email}</p>
              {/* </Button> */}
            </>
          );
        })}
      </RoomHomeCSS>
    </>
  );
};

export default RoomHome;
