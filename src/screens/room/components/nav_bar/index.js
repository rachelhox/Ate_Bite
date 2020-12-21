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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <RoomNavCSS>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Home" {...a11yProps(0)} />
          <Tab label="Map" {...a11yProps(1)} />
          <Tab label="Voting" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel className="homeroom" value={value} index={0}>
        {/* Rachel's Home component: */}
        <h3>Member List</h3>
        <hr/>
        <RoomHome />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* Mika's Map component: */}
        <MyMap />
      </TabPanel>
      <TabPanel value={value} index={2}>
        {/* Arran's voting component:
        <Voting /> */}
      </TabPanel>
    </RoomNavCSS>
  );
};

export default NavBar;
