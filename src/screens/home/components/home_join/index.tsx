import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { HomeJoinCSS } from "./styles";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import logo from "../../../../static/icons/ate-bite-logo.png";

export const HomeJoin = () => {
  const [inputs, setInputs] = useState({ username: "", roomcode: "" });
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setInputs((inputs) => ({
      ...inputs,
      [name]: value,
    }));
  };
  const [canSubmit, setCanSubmit] = useState(false);
  useEffect(() => {
    if (inputs.username && inputs.roomcode) {
      setCanSubmit(true);
    } else if (canSubmit) {
      setCanSubmit(false);
    }
  }, [inputs]);
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
      axios
        .post(process.env.REACT_APP_SERVER_URL + "/join", {
          username: inputs.username,
          roomcode: inputs.roomcode,
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success("success");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("error");
        });
    }
  };

  return (
    <HomeJoinCSS>
      <img src={logo} />
      <div className="form">
        <form noValidate autoComplete="off">
          <FormHelperText id="component-helper-text">
            If you don't want to log in
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
          <FormHelperText id="component-helper-text">
            Join a room
          </FormHelperText>
          <TextField
            id="outlined-uncontrolled"
            label="Room Code"
            name="roomcode"
            placeholder="Enter Room Code"
            value={inputs.roomcode}
            onChange={handleChange}
            variant="outlined"
          />
          <Button
            type="submit"
            disabled={!canSubmit}
            variant="outlined"
            color="primary"
            onClick={handleSubmit}
          >
            submit
          </Button>
        </form>
      </div>
    </HomeJoinCSS>
  );
};

export default HomeJoin;
