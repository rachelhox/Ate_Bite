import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import axios from "axios";

export const YourRooms = () => {
  const [inputs, setInputs] = useState({ roomname: "" });
  console.log(inputs);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(event.target);
    setInputs((inputs) => ({
      ...inputs,
      [name]: value,
    }));
  };
  return (
    <>
      <div className="form">
        <form noValidate autoComplete="off">
          <TextField
            id="outlined-name"
            label="Your Rooms"
            name="roomname"
            placeholder="Enter username"
            value={inputs.roomname}
            onChange={handleChange}
            variant="outlined"
          />
        </form>
      </div>
    </>
  );
};

export default YourRooms;
