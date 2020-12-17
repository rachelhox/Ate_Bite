import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import axios from "axios";

export const MakeRoomForm = () => {
  const [inputs, setInputs] = useState({ username: "", roomcode: "" });
  return (
    <>
      <div className="form">
        <form noValidate autoComplete="off">
          <FormHelperText id="component-helper-text">
            Make a room
          </FormHelperText>
          <TextField
            id="outlined-name"
            label="Username"
            name="username"
            placeholder="Enter username"
            value={inputs.username}
            onChange={handleChange}
            variant="outlined"
          />
        </form>
      </div>
    </>
  );
};

export default MakeRoomForm;
