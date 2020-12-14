import React from "react";
// import { Layout } from "../../components/index";
import { HomeJoin, SignInUpBtn } from "./components";
import { HomeCSS } from "./styles";

const Home = () => {
  return (
    <HomeCSS>
      <SignInUpBtn />
      <HomeJoin />
    </HomeCSS>
  );
};

export default Home;
