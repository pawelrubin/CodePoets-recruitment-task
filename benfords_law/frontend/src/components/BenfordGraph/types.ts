import { Digit } from "types";

export type BenfordGraphData = {
  digit: Digit;
  distribution: Number;
  benford: Number;
}[];

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/32553
export type IOption = { label: string; value: string };
