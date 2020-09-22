import styled, { css } from "styled-components";
import { ComposedChart } from "recharts";
import Select from "react-select";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 2px;
  width: 80%;
  height: 80%;
  justify-content: center;
`;

export const StyledComposedChart = styled(ComposedChart)(
  ({ theme }) => css`
    background-color: ${theme.color.primaryLight};
    color: ${theme.color.primaryDark};
    border-radius: ${theme.radius.mini};
  `
);

export const StyledSelect = styled(Select)(
  ({ theme }) => css`
    margin: ${theme.spacing.big} 0;
  `
);

export const BackButton = styled.button(
  ({ theme }) => css`
    position: absolute;
    right: 32px;
    top: 32px;
    width: 32px;
    height: 32px;
    opacity: 0.3;
    &:hover {
      opacity: 1;
    }
    &:before,
    &:after {
      position: absolute;
      left: 15px;
      content: " ";
      height: 33px;
      width: 2px;
      background-color: #333;
    }
    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
  `
);
