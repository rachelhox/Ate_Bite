import React from "react";
import logo from "../../static/icons/ate-bite-small-logo.png";
import { RoomCSS } from "./styles";
import { NavBar } from "./components";
import { Profile } from "../../components";
import Chat from "../chatroom";
import LiveFeed from "../livefeed";

export const Room = () => {
  return (
    <>
      <RoomCSS>
        <img src={logo} className="logo" alt="logo" />
        <Profile />
        <Chat style={{flexGrow: `1`}} />
        <NavBar style={{flexGrow: `2`}} value="" index={0} />
        <LiveFeed style={{flexGrow: `1`}} />
      </RoomCSS>
    </>
  );
};

export default Room;
