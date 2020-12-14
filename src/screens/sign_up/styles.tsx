import styled from "styled-components";

export const SignUpCSS = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  background: linear-gradient(351deg, #8900c8, #6189ec, #ff0000);
  background-size: 600% 600%;
  -webkit-animation: AnimationName 44s ease infinite;
  -moz-animation: AnimationName 44s ease infinite;
  animation: AnimationName 44s ease infinite;
  @-webkit-keyframes AnimationName {
    0%{background-position:43% 0%}
    50%{background-position:58% 100%}
    100%{background-position:43% 0%}
  }
  @-moz-keyframes AnimationName {
    0%{background-position:43% 0%}
    50%{background-position:58% 100%}
    100%{background-position:43% 0%}
  }
  @keyframes AnimationName {
    0%{background-position:43% 0%}
    50%{background-position:58% 100%}
    100%{background-position:43% 0%}
`;
