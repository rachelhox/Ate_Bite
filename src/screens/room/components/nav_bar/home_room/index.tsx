import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Link from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import { RoomHomeCSS, MemberListCSS } from "./styles";
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
  // styling
  // const useStylesColor = makeStyles({
  //   root: {
  //     borderColor: `${
  //       room.piccolour
  //     }`,
  //     border: "solid 0.2rem",
  //     backgroundColor: `${
  //       x.piccolour
  //     }`,
  //   },
  // });
  return (
    <>
      <RoomHomeCSS>
        {roomInfo.map((x, i) => {
          return (
            <MemberListCSS>
              {/* <Button
                onClick={() => {
                  history.push(`/room/${x.roomcode}/${user.userId}`);
                }}
                key={i}
              > */}
              {/* <Button
              classes={{ root: propicColor.root }}> */}
              <div
                className="propic"
                style={{
                  border: `solid 0.5rem ${x && x.piccolour}`,
                  borderRadius: `50%`,
                  backgroundColor: `${x && x.piccolour}`,
                  height: `5rem`,
                  width: `5rem`,
                  margin: `2rem`,
                }}
              >
                <img src={x.propic} alt="" />
              </div>
              <div className="info">
                <h3>{x.username}</h3>
                <p>{x.email}</p>
              </div>
              {/* </Button> */}
            </MemberListCSS>
          );
        })}
      </RoomHomeCSS>
    </>
  );
};

export default RoomHome;
