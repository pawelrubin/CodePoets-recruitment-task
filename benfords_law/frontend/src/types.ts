export type DataItem = {
  data: Number[];
};

export type Digit = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
export type BenfordColumnStats = Record<Digit, number>;
export type BenfordStats = Record<string, BenfordColumnStats>;

export const BENFORDS_VALUES = {
  "1": 0.30103,
  "2": 0.176091,
  "3": 0.124939,
  "4": 0.09691,
  "5": 0.0791812,
  "6": 0.0669468,
  "7": 0.0579919,
  "8": 0.0511525,
  "9": 0.0457575,
};
