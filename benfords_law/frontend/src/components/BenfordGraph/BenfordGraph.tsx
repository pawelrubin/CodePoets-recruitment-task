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
  ColumnStats,
  SignificantDigitsStats,
  BenfordStats,
  Digit,
} from "types";
import { BenfordGraphData, IOption } from "./types";
import { Container, StyledComposedChart, StyledSelect } from "./elements";
import { CloseButton } from "components/CloseButton";
import { theme } from "theme";

const getOptions = (stats: BenfordStats): IOption[] =>
  Object.entries(stats).map(([column, { obey }]) => ({
    value: `${column}`,
    label: `${column} - ${obey ? "obeys" : "doesn't obey"} the Benford's Law`,
  }));

const customStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: theme.color.primaryLight,
  }),
  option: (styles, { isSelected }) => ({
    ...styles,
    backgroundColor: isSelected
      ? theme.color.secondaryLight
      : theme.color.primaryLight,
    color: theme.color.primaryDark,
  }),
};

type BenfordGraphProps = {
  stats: BenfordStats;
  benford: SignificantDigitsStats;
  reset?: () => void;
};

export function BenfordGraph({ benford, stats, reset }: BenfordGraphProps) {
  const options = getOptions(stats);
  const [column, setColumn] = useState<string>(options[0]?.value);

  const parseData = (stats: ColumnStats): BenfordGraphData =>
    Object.entries(stats.values).map(([digit, distribution]) => ({
      digit: digit as Digit,
      distribution,
      benford: benford[digit as Digit],
    }));

  return (
    <Container>
      {reset && <CloseButton onClick={reset} />}
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
