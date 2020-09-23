export type DataItem = {
  data: Number[];
};
export type Digit = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
export type SignificantDigitsStats = {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
  "6": number;
  "7": number;
  "8": number;
  "9": number;
};

type Column = string;
export type ColumnStats = {
  obey: boolean;
  values: SignificantDigitsStats;
};
export type BenfordStats = Record<Column, ColumnStats>;

export type Project = {
  stats: BenfordStats;
  filename: string;
  timestamp: string; // TODO: https://gcanti.github.io/io-ts-types/modules/DateFromISOString.ts.html
  author?: string;
};
