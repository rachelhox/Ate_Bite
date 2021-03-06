import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import TextField from "@material-ui/core/TextField";
import { SignInUpBtnCSS } from "./styles";
import Popover from "@material-ui/core/Popover";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import validator from "validator";
import {
  loginUserThunk,
  loginFacebookThunk,
  logoutNowThunk,
} from "../../../../redux/action";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";
import SignUp from "../../../sign_up";
import { useHistory } from "react-router-dom";

// styling for paper
const useStylesPaper = makeStyles({
  paper: {
    padding: "1rem",
  },
});
// styling for form
const useStylesForm = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});
// styling for input
const useStylesInput = makeStyles({
  root: {
    margin: "0.5rem",
  },
});
// styling for submit btn
const useStylesBtn = makeStyles({
  root: {
    width: "100%",
    margin: "0.3rem",
  },
});

const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.authStore.isAuthenticated,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    loginRedux: (email: any, password: any) => {
      dispatch(loginUserThunk(email, password));
    },
    loginFacebookRedux: (accessToken: any) => {
      dispatch(loginFacebookThunk(accessToken));
    },
    logoutRedux: () => {
      dispatch(logoutNowThunk());
    },
  };
};

const SignInUpBtn = (props: any) => {
  const [loggedin, setLoggedin] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // handle sign in form inputs
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setInputs((inputs) => ({
      ...inputs,
      [name]: value,
    }));
  };
  const [canSubmit, setCanSubmit] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (validator.isEmail(inputs.email) && inputs.password) {
      setCanSubmit(true);
    } else if (canSubmit) {
      setCanSubmit(false);
    }
    if (props.isAuthenticated) {
      setLoggedin(true);
    }

    if (loggedin === true) {
      let userId = localStorage.getItem("userId");
      history.push(`/dashboard/${userId}`);
    }
  }, [inputs, history, loggedin, props.isAuthenticated]);

  const handleSubmit = async () => {
    await props.loginRedux(inputs.email, inputs.password);
    setLoggedin(true);
  };
  const handleLogOut = () => {
    props.logoutRedux();
  };

  const handleClickSignUp = () => {
    history.push("/sign-up");
  };

  // for styling paper
  const classesPaper = useStylesPaper();
  // for styling form
  const classesForm = useStylesForm();
  // for styling form
  const classesInput = useStylesInput();
  // for styling submit btn
  const classesBtn = useStylesBtn();

  return (
    <SignInUpBtnCSS>
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Log In / Sign Up
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: -10,
          horizontal: "right",
        }}
        classes={{ paper: classesPaper.paper }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <FormControl classes={{ root: classesForm.root }}>
            <TextField
              id="outlined-name"
              label="Email Address"
              name="email"
              placeholder="Enter email address"
              value={inputs.email}
              onChange={handleChange}
              variant="outlined"
              classes={{ root: classesInput.root }}
            />
            <TextField
              id="outlined-name"
              label="Password"
              type="password"
              name="password"
              placeholder="Enter password"
              value={inputs.password}
              onChange={handleChange}
              variant="outlined"
              classes={{ root: classesInput.root }}
            />
            <Button
              type="submit"
              disabled={!canSubmit}
              variant="outlined"
              color="primary"
              classes={{ root: classesBtn.root }}
              onClick={handleSubmit}
            >
              sign in
            </Button>
            <Button
              variant="contained"
              color="primary"
              classes={{ root: classesBtn.root }}
              onClick={handleClickSignUp}
            >
              sign up
            </Button>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              classes={{ root: classesBtn.root }}
              onClick={handleLogOut}
            >
              sign out
            </Button>
          </FormControl>
        </ClickAwayListener>
      </Popover>
      <Route path="/sign-up" component={SignUp} />
    </SignInUpBtnCSS>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInUpBtn);
