import { createContext, useContext } from "react";
import { SignificantDigitsStats } from "types";

export const BenfordContext = createContext<SignificantDigitsStats | null>(
  null
);

export const useBenford = () => useContext(BenfordContext)!;
