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

export const StyledComposedChart = styled(ComposedChart)(({ theme }) => css`
  background-color: ${theme.color.primaryLight};
  color: ${theme.color.primaryDark};
  border-radius: ${theme.radius.mini};
`);

export const StyledSelect = styled(Select)(({ theme }) => css`
  margin: ${theme.spacing.big} 0;
`);