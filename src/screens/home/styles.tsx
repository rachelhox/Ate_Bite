import styled from "styled-components";

export const HomeCSS = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;

  background: linear-gradient(145deg, #ff0200, #0637fd, #fd5406);
  background-size: 600% 600%;

  -webkit-animation: MainBackground 13s ease infinite;
  -moz-animation: MainBackground 13s ease infinite;
  -o-animation: MainBackground 13s ease infinite;
  animation: MainBackground 13s ease infinite;

  @-webkit-keyframes MainBackground {
    0% {
      background-position: 5% 0%;
    }
    50% {
      background-position: 96% 100%;
    }
    100% {
      background-position: 5% 0%;
    }
  }
  @-moz-keyframes MainBackground {
    0% {
      background-position: 5% 0%;
    }
    50% {
      background-position: 96% 100%;
    }
    100% {
      background-position: 5% 0%;
    }
  }
  @-o-keyframes MainBackground {
    0% {
      background-position: 5% 0%;
    }
    50% {
      background-position: 96% 100%;
    }
    100% {
      background-position: 5% 0%;
    }
  }
  @keyframes MainBackground {
    0% {
      background-position: 5% 0%;
    }
    50% {
      background-position: 96% 100%;
    }
    100% {
      background-position: 5% 0%;
    }
  }
`;
