import React from "react";
import logo from "../../static/icons/ate-bite-logo.png";
import { DashboardCSS } from "./styles";
import { RoomNav } from "./components";

export const Dashboard = () => {
  return (
    <>
      <DashboardCSS>
        <img src={logo} alt="logo" />
        <RoomNav value="" index={0} />
      </DashboardCSS>
    </>
  );
};

export default Dashboard;
