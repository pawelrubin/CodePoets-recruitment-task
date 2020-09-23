import { createGlobalStyle, css } from "styled-components";
import { ThemeType } from "theme";

export const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>(
  ({ theme }) => css`
    html,
    body {
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
    }

    body {
      background: ${css`linear-gradient(127deg, ${theme.color.primaryDark} 0%, ${theme.color.secondaryDark} 85%)`};
      color: ${theme.color.primaryLight};
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol";
    }

    #root {
      align-items: center;
      display: flex;
      justify-content: center;
      @media (max-width: ${({ theme }) => theme.mobile}) {
        flex-direction: column;
      }
    }

    main {
      margin: 0 auto;
      align-items: flex-start;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      width: 100%;
      align-items: center;
      flex-grow: 1;
    }
  `
);
