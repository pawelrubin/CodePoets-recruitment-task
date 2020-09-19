import { DigitsStats } from "../../types";

export type BenfordGraphProps = {
  stats: DigitsStats;
};

export type BenfordGraphData = {
  digit: string;
  distribution: Number;
}[];
