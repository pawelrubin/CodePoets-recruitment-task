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
    background: ${({ theme }) =>
      css`linear-gradient(127deg, ${theme.color.primaryDark} 0%, ${theme.color.secondaryDark} 85%)`};
    color:  ${({ theme }) => theme.color.primaryLight};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    height: 100vh;
  }

  #root {
    display: flex;
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
  main {
    margin: 0 auto;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    width: 100%;
    align-items: center;
    flex-grow: 1
  }
  
  `;
