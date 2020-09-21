import React, { useState } from "react";

import {
  CartesianGrid,
  Legend,
  Line,
  Tooltip,
  XAxis,
  Bar,
  ComposedChart,
  YAxis,
} from "recharts";
import Select from "react-select";
import { BENFORDS_VALUES, BenfordColumnStats, BenfordStats, Digit } from "types";
import { BenfordGraphData, BenfordGraphProps, IOption } from "./types";
import { Container } from "./elements";

const parseData = (stats: BenfordColumnStats): BenfordGraphData =>
  Object.entries(stats).map(([digit, distribution]) => ({
    digit,
    distribution,
    benford: BENFORDS_VALUES[digit as Digit],
  }));

const getOptions = (stats: BenfordStats): IOption[] =>
  Object.keys(stats).map((column) => ({ value: column, label: column }));

export function BenfordGraph({ stats }: BenfordGraphProps) {
  const options = getOptions(stats);
  const [column, setColumn] = useState<string>(options[0]?.value);

  return (
    <Container>
      <Select
        defaultValue={options[0]}
        options={options}
        onChange={(option) => setColumn((option as IOption).value)}
      />
      <ComposedChart
        width={700}
        height={300}
        data={column ? parseData(stats[column]) : []}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis />
        <XAxis dataKey="digit" />
        <Tooltip />
        <Legend />
        <Bar dataKey="distribution" fill="#8884d8" />
        <Line dataKey="benford" fill="#213769" />
      </ComposedChart>
    </Container>
  );
}
