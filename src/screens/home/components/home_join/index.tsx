import React, { useState, useEffect } from "react";
import { HomeJoinCSS } from "./styles";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Hello from "../../../hello";
import logo from "../../../../static/icons/ate-bite-logo.png";
import { useHistory } from "react-router-dom";

export const HomeJoin = () => {
  const history = useHistory();
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
          >
            submit
          </Button>
        </form>
        <Button onClick={() => {
          history.push("/hello")
        }}>Hello</Button>
      </div>
      {/* <Route path="/hello" component={Hello} /> */}
    </HomeJoinCSS>
  );
};

export default HomeJoin;
