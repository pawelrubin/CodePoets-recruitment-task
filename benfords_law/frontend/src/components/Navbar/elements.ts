// Menu.styled.js
import styled from "styled-components";

export const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.color.primaryLight};
  height: 100vh;
  text-align: left;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
    height: initial;
    position: sticky;
  }
  ul {
    padding: 2rem;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow: hidden;
      &>li {
        display: inline-block;
      }
      text-align: center;
    }
  }

  li a {
    font-size: 2rem;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.2rem;
    color: ${({ theme }) => theme.color.primaryDark};
    text-decoration: none;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 1.2rem;
      text-align: center;
      display: block;
      margin: 0 20px;
    }

    &:hover {
      color: ${({ theme }) => theme.color.secondaryDark};
    }
  }
`;
