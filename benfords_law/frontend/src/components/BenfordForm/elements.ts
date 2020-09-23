import styled, { css } from "styled-components";

export const StyledForm = styled.form(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    background-color: ${theme.color.primaryLight};
    margin: ${theme.spacing.big};
    padding: ${theme.spacing.big};
    border-radius: ${theme.radius.small};
    width: 40%;

    input {
      margin: 0 0 20px;
      color: ${theme.color.primaryDark};
    }
  `
);

export const Error = styled.div(
  ({ theme }) => css`
    color: ${theme.color.error};
    font-size: 0.9rem;
  `
);
