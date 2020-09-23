import styled, { css } from "styled-components";

export const Container = styled.div`
  height: 100vh;
  overflow-y: scroll;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Item = styled.div(
  ({ theme }) => css`
    width: 60%;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-content: center;
    align-self: center;

    @media (max-width: ${theme.mobile}) {
      width: 90%;
    }
  `
);
