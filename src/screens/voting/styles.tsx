import styled from "styled-components";

export const VotingroomCSS = styled.div`
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
    align-items: center;
    // border: 0.1rem solid;
    border-radius: 0.5rem;
    padding: 0.4rem;
    margin: 0.2rem;
    background-color: rgba(255, 255, 255, 0.1);
  }
  .voteOptionItem>div {
    width: 14rem;
  }
  .votingTable {
    height: 25rem;
    width: 30rem;
    // border: 1px solid black;
    overflow: auto;
    border: 1px solid rgba(165, 55, 253, 0.7);
    border-radius: 0.5rem;
    box-shadow: 20px 20px 20px -20px rgba(165, 55, 253, 1);
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
  h4, h5 {
    margin-bottom: 0rem;
  }
  hr {
    box-shadow: 0 20px 5px -20px rgba(165, 55, 253);
    width: 100%;
  }
`;
