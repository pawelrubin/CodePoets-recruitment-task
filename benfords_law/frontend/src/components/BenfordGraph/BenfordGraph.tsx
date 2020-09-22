import React, { useState } from "react";

import {
  CartesianGrid,
  Legend,
  Line,
  Tooltip,
  XAxis,
  Bar,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { StylesConfig } from "react-select";
import {
  BENFORDS_VALUES,
  BenfordColumnStats,
  BenfordStats,
  Digit,
} from "types";
import { BenfordGraphData, BenfordGraphProps, IOption } from "./types";
import { Container, StyledComposedChart, StyledSelect } from "./elements";
import { theme } from "theme";

const parseData = (stats: BenfordColumnStats): BenfordGraphData =>
  Object.entries(stats).map(([digit, distribution]) => ({
    digit,
    distribution,
    benford: BENFORDS_VALUES[digit as Digit],
  }));

const getOptions = (stats: BenfordStats): IOption[] =>
  Object.keys(stats).map((column) => ({ value: column, label: column }));

const customStyles: StylesConfig = {
  control: styles => ({ ...styles, backgroundColor: theme.color.primaryLight }),
  option: (styles, { isSelected }) => ({
    ...styles,
    backgroundColor: isSelected
      ? theme.color.secondaryDark
      : theme.color.primaryLight,
    color: isSelected ? theme.color.primaryLight : theme.color.primaryDark,
  }),
};

export function BenfordGraph({ stats }: BenfordGraphProps) {
  const options = getOptions(stats);
  const [column, setColumn] = useState<string>(options[0]?.value);

  return (
    <Container>
      <StyledSelect
        defaultValue={options[0]}
        options={options}
        onChange={(option: IOption) => setColumn(option.value)}
        styles={customStyles}
      />
      <ResponsiveContainer width="100%" aspect={16.0 / 9.0}>
        <StyledComposedChart
          data={column && stats[column] ? parseData(stats[column]) : []}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis />
          <XAxis dataKey="digit" />
          <Tooltip />
          <Legend />
          <Bar dataKey="distribution" fill="#8884d8" />
          <Line dataKey="benford" fill="#213769" />
        </StyledComposedChart>
      </ResponsiveContainer>
    </Container>
  );
}
