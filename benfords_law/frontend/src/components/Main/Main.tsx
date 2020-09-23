import React, { useState } from "react";
import { BenfordStats, SignificantDigitsStats } from "types";
import { BenfordForm } from "components/BenfordForm";
import { BenfordGraph } from "components/BenfordGraph";

export function Main({benford}: {benford: SignificantDigitsStats}) {
  const [stats, setStats] = useState<BenfordStats>();
  
  return (
    <>
      {!stats || !benford ? (
        <BenfordForm setStats={setStats}></BenfordForm>
      ) : (
        <BenfordGraph
          benford={benford}
          stats={stats}
          reset={() => setStats(undefined)}
        ></BenfordGraph>
      )}
    </>
  );
}
