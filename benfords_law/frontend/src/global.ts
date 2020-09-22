import { createGlobalStyle, css } from "styled-components";
import { ThemeType } from "theme";

export const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }

  body {
    align-items: center;
    background: ${({ theme }) =>
      css`linear-gradient(127deg, ${theme.color.primaryDark} 0%, ${theme.color.secondaryDark} 85%)`};
    color:  ${({ theme }) => theme.color.primaryLight};
    display: flex;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    height: 100vh;
    justify-content: center;
  }

  h1 {
    font-size: 2rem;
    text-align: center;
    text-transform: uppercase;
  }

  div {
    text-align: center;
  }

  a {
    color: ${({ theme }) => theme.color.secondaryDark};
    text-decoration: none;
  }
  `;
