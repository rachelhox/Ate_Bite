import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Link from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import axios from "axios";

export const YourRooms = () => {
  const history = useHistory();
  let user: any = useParams();
  const [inputs, setInputs] = useState({ roomname: "" });
  const [roomInfo, setRoomInfo] = useState([]);
  console.log(inputs);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(event.target);
    setInputs((inputs) => ({
      ...inputs,
      [name]: value,
    }));
  };
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/dashboard/getRoom/${user.userId}`
      )
      .then((data) => {
        let x = data.data;
        setRoomInfo([...x]);
      });
  }, []);
  return (
    <>
      <div>
        {roomInfo.map((x, i) => {
          return (
            <div className="myRoom">
              <button
                onClick={() => {
                  history.push(`/room/${x.roomcode}/${user.userId}`);
                }}
              >
                {x.roomname}#{x.roomcode}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default YourRooms;
