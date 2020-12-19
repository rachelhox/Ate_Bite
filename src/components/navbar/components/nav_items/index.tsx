import React from "react";
import Link from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";

const IconTabs = () => {
  // const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Paper square className="nav-items">
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon tabs example"
      >
        <Tab icon={<PhoneIcon />} label="Recommendations" />
        <Tab icon={<FavoriteIcon />} label="Map" />
        <Tab icon={<PersonPinIcon />} label="Voting" />
      </Tabs>
    </Paper>
  );
};

export default IconTabs;
