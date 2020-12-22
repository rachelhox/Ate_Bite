import React from "react";
import logo from "../../static/icons/ate-bite-logo.png";
import { DashboardCSS } from "./styles";
import { RoomNav } from "./components";
import { Profile } from "../../components";

export const Dashboard = () => {
  return (
    <>
      <DashboardCSS>
        <img src={logo} alt="logo" />
        <Profile />
        <RoomNav value="" index={0} />
      </DashboardCSS>
    </>
  );
};

export default Dashboard;
