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

  .MuiAppBar-colorPrimary {
    color: rgba(255, 255, 255);
    background-color: transparent;
  }

  #simple-tabpanel-2 {
    max-height: 50vh;
    overflow: scroll;
  }
  .whole {
    display: flex;
    flex-direction: row;
    // width: 100vw;
    margin: auto;
  }
  .homeroom {
    width: 100%;
    height: 80vh;
  }
  .MuiAppBar-root {
    margin: auto;
  }
  .tab {
    height: 80vh;
  }
`;
