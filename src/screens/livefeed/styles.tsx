import styled from "styled-components";

export const LiveFeedCSS = styled.div`
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
  // border: 1px solid black;
  .LivefeedContainer{
    border: 1px solid rgba(165, 55, 253, 0.7);
    border-radius: 0.5rem;
    box-shadow: 20px 20px 20px -20px rgba(165, 55, 253, 1);
    width: 23rem;
    height: 70vh;
    overflow: scroll;

  }
  .feedItem {
    padding: 1rem;
    display: flex;
    justify-content: space-around;
    color: white;
    font-family: sans-serif;
  }
`;
