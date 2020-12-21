import styled from "styled-components";

export const RoomCSS = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 2rem;
  img {
    width: 5rem;
  }

  background: rgb(240, 53, 53);
  background: linear-gradient(
    153deg,
    rgba(240, 53, 53, 1) 12%,
    rgba(131, 58, 180, 1) 54%,
    rgba(49, 29, 253, 1) 84%
  );
`;
