import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import TextField from "@material-ui/core/TextField";
import { ProfileBtnCSS } from "./styles";
import Popover from "@material-ui/core/Popover";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import validator from "validator";
import axios from "axios";
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
// import SignUp from "../../../sign_up";
// import any other components for editing & uploading buttons

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
    margin: `0 0 0 0`,
    fontFamily: `sans-serif`,
    textTransform: `uppercase`,
    color: `#3f51b5`,
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

const ProfileBtn = (props: any) => {
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
  // get data from url
  const gettingParams = window.location.href.replaceAll("/", " ").split(" ");
  // get roomcode
  const roomcode = gettingParams[gettingParams.length - 2];
  // get user id
  const userId = gettingParams[gettingParams.length - 1];
  const [profileInfo, setProfileInfo] = useState([]);
  const [first, setFirst] = useState(false);
  // to check if user is a random user or logged in user
  const [random, setRandom] = useState(false);
  const history = useHistory();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/getProfile/${userId}`)
      .then((data) => {
        let x = data.data;
        // console.log(x);
        if (x.length > 0) {
          setFirst(true);
        }
        if (first === true) {
          setProfileInfo([...x]);
        }
        // setProfileInfo(profileInfo.concat(x));
        // console.log(x);
        console.log(x[0].loggedin);
        if (x[0].loggedin === false) {
          setRandom(true);
        }
      });
  }, [first]);

  // styling
  const useStylesColor = makeStyles({
    root: {
      borderColor: `${
        profileInfo && profileInfo[0] && profileInfo[0].piccolour
      }`,
      border: "solid 0.2rem",
      backgroundColor: `${
        profileInfo && profileInfo[0] && profileInfo[0].piccolour
      }`,
    },
  });

  const handleSubmit = async () => {
    await props.loginRedux(inputs.email, inputs.password);
    setLoggedin(true);
  };
  const handleLogOut = () => {
    props.logoutRedux();
  };

  const handleExit = () => {
    history.push("/");
  };

  const handleClickSignUp = () => {
    history.push("/sign-up");
  };

  const handleDashboard = () => {
    history.push(`/dashboard/${userId}`);
  };

  // for styling paper
  const classesPaper = useStylesPaper();
  // for styling form
  const classesForm = useStylesForm();
  // for styling form
  const classesInput = useStylesInput();
  // for styling submit btn
  const classesBtn = useStylesBtn();

  const propicColor = useStylesColor();

  // const imgBorder = {
  //   border-color:
  // }

  return (
    <ProfileBtnCSS>
      {random === false ? (
        <div>
          <Button
            aria-describedby={id}
            // variant="contained"
            // color="primary"
            className="button"
            onClick={handleClick}
            classes={{ root: propicColor.root }}
          >
            <img
              src={profileInfo && profileInfo[0] && profileInfo[0].propic}
              alt=""
            />
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
                <h4>
                  {profileInfo && profileInfo[0] && profileInfo[0].username}
                </h4>
                <Button
                  variant="outlined"
                  color="primary"
                  classes={{ root: classesBtn.root }}
                  onClick={handleDashboard}
                >
                  Dashboard
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
        </div>
      ) : (
        // <div>
        //   <Button
        //   aria-describedby={id}
        //   // variant="contained"
        //   // color="primary"
        //   className="random-button"
        //   classes={{ root: propicColor.root }}
        // >
        //   <img
        //     src={profileInfo && profileInfo[0] && profileInfo[0].propic}
        //     alt=""
        //   />
        // </Button>
        // </div>
        <div>
          <Button
            aria-describedby={id}
            // variant="contained"
            // color="primary"
            className="button"
            onClick={handleClick}
            classes={{ root: propicColor.root }}
          >
            <img
              src={profileInfo && profileInfo[0] && profileInfo[0].propic}
              alt=""
            />
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
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  classes={{ root: classesBtn.root }}
                  onClick={handleExit}
                >
                  exit
                </Button>
              </FormControl>
            </ClickAwayListener>
          </Popover>
        </div>
      )}
    </ProfileBtnCSS>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileBtn);
