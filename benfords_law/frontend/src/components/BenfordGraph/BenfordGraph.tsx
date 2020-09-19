import React from "react";

import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis } from "recharts";
import { DigitsStats } from "../../types";
import { BenfordGraphData, BenfordGraphProps } from "./types";

function parseData(stats: DigitsStats): BenfordGraphData {
  return Object.entries(stats).map(([digit, distribution]) => ({
    digit,
    distribution,
  }));
}

export function BenfordGraph({ stats }: BenfordGraphProps) {
  return (
    <LineChart width={700} height={300} data={parseData(stats)}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="digit" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="distribution" stroke="#8884d8" />
    </LineChart>
  );
}
