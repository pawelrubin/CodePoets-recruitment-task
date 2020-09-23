import styled, { css } from "styled-components";

export const Container = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    background-color: ${theme.color.primaryLight};
    margin: ${theme.spacing.big};
    padding: ${theme.spacing.big};
    border-radius: ${theme.radius.small};
    form {
      display: flex;
      flex-direction: column;
    }
  `
);

export const Error = styled.p(
  ({ theme }) => css`
    color: ${theme.color.error};
    font-size: 0.9rem;
  `
);
