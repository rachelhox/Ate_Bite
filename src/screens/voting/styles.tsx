import styled from "styled-components";

export const VotingroomCSS = styled.div`
div * {
  scrollbar-width: none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: none !important;
    background-color: transparent;
  }
  ::-webkit-scrollbar {
    width: 0px !important;
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
}
  color: white;
  height: 80vh;
  .votingContainer {
    display: flex;
    flex-direction: row;
    margin: 1rem;
    height: 80vh;
    width: 43rem;
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
  .voteOptionItem > div {
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
    background-color: rgba(125, 25, 255, 1);
  }
  .MuiLinearProgress-root {
    height: 1.2rem;
  }
  h4,
  h5 {
    margin-bottom: 0rem;
  }
  hr {
    box-shadow: 0 20px 5px -20px rgba(165, 55, 253);
    width: 100%;
  }
  .voteCountItem {
    margin-bottom: 1rem;
  }
  p {
    color: white;
  }
  .MuiInputBase-input {
    color: white;
  }
  .MuiInput-underline:before {
    border-bottom: 1px solid white;
  }
  .MuiButton-root {
    color: white;
  }
`;
