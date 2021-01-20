import React from "react";
// import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { MyMap } from "../../../map/components";
import { RoomHome } from "./home_room";
import { RoomNavCSS } from "./styles";
// import Chat from "../../../chatroom";
// import LiveFeed from "../../../livefeed";
import Voting from "../../../voting";

import useTabUsers from './hooks/useTabUsers'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export const NavBar = (props) => {

  const gettingParams = window.location.href.replaceAll("/", " ").split(" ");
  const roomcode = gettingParams[gettingParams.length - 2];

  const [value, setValue] = React.useState(0);
  const { tabUsers, sendTabUsers,  } = useTabUsers(roomcode);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    sendTabUsers(newValue);
    
  };

  return (
    <RoomNavCSS>
      <AppBar position="static">
        <Tabs
          className="tabsBox"
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Home" {...a11yProps(0)} />
          <Tab label="Map" {...a11yProps(1)} />
          <Tab label="Voting" {...a11yProps(2)} />
        </Tabs>
        <div className="avatarContainer">
            <div className >
                test
            </div>
            <h3>map</h3>
            <h3>voting</h3>
          
        </div>
      </AppBar>
      {/* <div className="whole"> */}
      {/* <Chat /> */}
      <TabPanel className="tabSizing" value={value} index={0}>
        <h3>Member List</h3>
        <hr />
        <RoomHome />
      </TabPanel>
      <TabPanel className="tabSizing" value={value} index={1}>
        <div className="mapTabKeepSize">
          <MyMap />
        </div>
      </TabPanel>
      <TabPanel className="tabSizing" value={value} index={2}>
        <br />
        <br />
        <Voting />
      </TabPanel>
      {/* <LiveFeed /> */}
      {/* </div> */}
    </RoomNavCSS>
  );
};

export default NavBar;
