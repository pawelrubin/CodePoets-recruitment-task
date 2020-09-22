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

export const FileInput = styled.input(
  ({ theme }) => css`
    &::-webkit-file-upload-button {
      visibility: hidden;
    }
    box-sizing: border-box;
    appearance: none;
    background-color: transparent;
    border: 2px solid ${theme.color.primaryDark};
    border-radius: 0.6em;
    color: ${theme.color.primaryDark};
    cursor: pointer;
    display: flex;
    align-self: center;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    margin: 20px;
    padding: 1.2em 2.8em;

    text-decoration: none;
    text-align: center;
    text-transform: uppercase;
    font-weight: 700;

    &:hover,
    &:focus {
      color: ${theme.color.secondaryDark};
      outline: 0;
    }

    transition: box-shadow 250ms ease-in-out, color 300ms ease-in-out;
    &:hover {
      box-shadow: 0 0 40px 40px ${theme.color.secondaryDark} inset;
      color: ${theme.color.primaryLight};
    }
  `
);
