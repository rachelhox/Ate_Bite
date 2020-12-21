import styled from "styled-components";

export const RoomNavCSS = styled.div`
  p {
    display: flex;
    flex-direction: column;
    align-items: center;
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
`;
