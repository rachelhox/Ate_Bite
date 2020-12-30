import styled from "styled-components";

export const RoomHomeCSS = styled.div`
  color: antiquewhite;
  height: 70vh;
  overflow: scroll;
  width: 45vw;
  //   width: fit
`;

export const MemberListCSS = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  .info {
    flex-direction: column;
  }
  h3 {
    margin-bottom: 1rem;
  }
`;
