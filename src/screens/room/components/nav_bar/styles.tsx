import styled from "styled-components";

export const RoomNavCSS = styled.div`
  p {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h3 {
    color: antiquewhite;
  }
  hr {
    // width: 100%;
    // border-color: rgba(140, 20, 252, 1);
    // height: 1px;
    border: none;
    height: 20px;
    width: 100%;
    height: 50px;
    margin-top: 0;
    border-bottom: 1px solid transparent;
    box-shadow: 0 20px 20px -20px rgba(165, 55, 253, 1);
    // rgba(165, 55, 253, 1)
    margin: -50px auto 10px;
  }
  .MuiPaper-elevation4 {
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2),
      0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 10px 8px 0px rgba(0, 0, 0, 0.12);
  }
  .MuiTypography-body1 {
    display: flex;
    justify-content: center;
  }
  .MuiTabs-fixed {
    display: flex;
    justify-content: space-evenly;
    width: 45rem;
  }
  .avatar{
    display:flex;
    justify-content:center;
    width:100%
  }
  .avatarContainer{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 30rem;
    height: 4rem;
  }
  .MuiAvatarGroup-avatar{
    border:none;
  }
  .box0{
    min-width:6.5rem;
  }
  .box1{
    margin-left: 3.5rem;
    min-width:6.5rem;
  }
  .box2{
    margin-left: 3.5rem;
    min-width:6.5rem;
  }
  .MuiAppBar-colorPrimary {
    color: rgba(255, 255, 255);
    background-color: transparent;
  }
  .whole {
    display: flex;
    flex-direction: row;
    // width: 100vw;
    margin: auto;
  }
  .tabSizing {
    width: 100%;
    height: 80vh;
    overflow-x: hidden;
    overflow-y: hidden;
  }
  .mapTabKeepSize{
    width: 45vw;
    height: 75vh;
  }
  .MuiAppBar-root {
    margin: auto;
  }
  .tab {
    height: 80vh;
  }
`;
