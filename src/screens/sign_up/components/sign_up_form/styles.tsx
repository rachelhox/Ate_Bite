import styled from "styled-components";

export const SignUpFormCSS = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .MuiInputBase-input {
    width: inherit;
  }
  .MuiInputBase-root {
    display: flex;
    flex-direction: column;
    color: rgba(255, 255, 255);
    &:hover {
      color: rgba(255, 255, 255, 1);
    }
  }
  .MuiFormLabel-root {
    color: rgba(255, 255, 255);
  }
  .MuiFormLabel-root.Mui-focused {
    color: rgba(255, 255, 255, 1);
  }
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: rgba(255, 255, 255, 1);
  }
  .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: rgba(255, 255, 255, 1);
  }
  .MuiButton-outlined.Mui-disabled {
    background-color: transparent;
    box-shadow: none;
  }
  .MuiButton-outlinedPrimary {
    color: rgba(255, 255, 255, 1);
    border: 1px solid rgba(255, 255, 255, 0.7);
    background-color: rgba(255, 255, 255, 0.2);
    &:hover {
      border: 1px solid rgba(255, 255, 255, 1);
    }
  }
  .MuiOutlinedInput-notchedOutline {
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0.2rem 0.3rem 0.3rem rgba(0, 0, 0, 0.1);
  }
  button {
    color: rgba(255, 255, 255, 1);
    border: 1px solid rgba(255, 255, 255, 0.7);
    background-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0.4rem 0.3rem 0.3rem rgba(0, 0, 0, 0.1);
    &:hover {
      border: 1px solid rgba(255, 255, 255, 1);
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    padding-top: 1rem;
  }
`;
