import { createGlobalStyle } from "styled-components";
import { ThemeType } from "theme";

export const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
  html, body {
    margin: 0;
    padding: 0;
  }

  body {
    align-items: center;
    background: ${({ theme }) => theme.primaryDark};
    color:  ${({ theme }) => theme.primaryLight};
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

  // links
  a {
    color: ${({ theme }) => theme.primaryHover};
    text-decoration: none;
  }
  `;
