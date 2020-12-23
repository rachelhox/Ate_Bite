import styled from "styled-components";

export const VotingroomCSS = styled.div`
  height: 100vh;
  width: 50%;

  .votingContainer {
    display: flex;
    flex-direction: row;
    margin: 1rem;
    height: 40rem;
    width: 45rem;
  }
  .voteOptionsContainer {
    width: 30rem;
    padding-right: 5rem;
    overflow: auto;
  }
  .voteOptionsList {
    display: flex;
    flex-direction: column;
    list-style-type: none;
    padding: 0;
  }
  .voteTableList {
    display: flex;
    flex-direction: column;
    list-style-type: none;
    padding-top: 1rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }
  .voteOptionItem {
    display: flex;
    border: 0.1rem solid;
  }
  .votingTable {
    height: 25rem;
    width: 30rem;
    border: 1px solid black;
    overflow: auto;
  }
  .enableButton {
    color: green;
  }
  .disableButton {
    color: grey;
  }
  .MuiLinearProgress-colorPrimary {
    background-color: white;
}
  .MuiLinearProgress-barColorPrimary {
    background-color: red;
  }
  .MuiLinearProgress-root{
    height: 1.2rem;
  }
  h5 {
    margin-bottom: 0rem;
  }
`;
