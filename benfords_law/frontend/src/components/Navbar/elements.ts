// Menu.styled.js
import styled from "styled-components";

export const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.color.primaryLight};
  height: 100vh;
  text-align: left;
  padding: 0 2rem;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }
  ul {
    padding: 0;
  }

  a {
    font-size: 2rem;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.4rem;
    color: ${({ theme }) => theme.color.primaryDark};
    text-decoration: none;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: ${({ theme }) => theme.color.secondaryDark};
    }
  }
`;
