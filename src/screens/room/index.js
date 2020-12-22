import React from "react";
import logo from "../../static/icons/ate-bite-small-logo.png";
import { RoomCSS } from "./styles";
import { NavBar } from "./components";
import { Profile } from "../../components";

export const Room = () => {
  return (
    <>
      <RoomCSS>
        <img src={logo} className="logo" alt="logo" />
        <Profile />
        <NavBar value="" index={0} />
      </RoomCSS>
    </>
  );
};

export default Room;
