import { BenfordStats } from "../../types";

export type BenfordGraphProps = {
  stats: BenfordStats;
};

export type BenfordGraphData = {
  digit: string;
  distribution: Number;
  benford: Number;
}[];

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/32553
export type IOption = { label: string; value: string };
