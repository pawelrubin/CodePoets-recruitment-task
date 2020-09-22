import React, { useState } from "react";
import { BenfordStats } from "types";
import { BenfordForm } from "components/BenfordForm";
import { BenfordGraph } from "components/BenfordGraph";

const mock = {
  "7_2009": {
    "1": 0.2939970267083611,
    "2": 0.18167837186650945,
    "3": 0.12000820218383144,
    "4": 0.09468395960424462,
    "5": 0.0799200287076434,
    "6": 0.07023119905674886,
    "7": 0.05977341467165633,
    "8": 0.05341672220228636,
    "9": 0.04629107499871841,
  },
};

export function Main() {
  const [stats, setStats] = useState<BenfordStats>();

  return (
    <>
      {!stats ? (
        <BenfordForm setStats={setStats}></BenfordForm>
      ) : (
        <BenfordGraph stats={stats}></BenfordGraph>
      )}
    </>
  );
}
