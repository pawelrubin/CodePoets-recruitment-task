import React, { useEffect, useState } from "react";
import { BenfordStats, SignificantDigitsStats } from "types";
import { BenfordForm } from "components/BenfordForm";
import { BenfordGraph } from "components/BenfordGraph";

import { BackButton } from "./elements";

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
  const [stats, setStats] = useState<BenfordStats | null>();
  const [benford, setBenford] = useState<SignificantDigitsStats>();

  useEffect(() => {
    fetch("/api/benford/assert_stats/")
      .then((res) => res.json())
      .then((data: SignificantDigitsStats) => {
        setBenford(data);
      });
  }, []);


  return (
    <>
      {!stats || !benford ? (
        <BenfordForm setStats={setStats}></BenfordForm>
      ) : (
        <BenfordGraph benford={benford} stats={stats} reset={() => setStats(null)}></BenfordGraph>
      )}
    </>
  );
}
