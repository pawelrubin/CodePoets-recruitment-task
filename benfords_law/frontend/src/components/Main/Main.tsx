import React, { useEffect, useState } from "react";
import { BenfordStats, SignificantDigitsStats } from "types";
import { BenfordForm } from "components/BenfordForm";
import { BenfordGraph } from "components/BenfordGraph";

export function Main() {
  const [stats, setStats] = useState<BenfordStats>();
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
        <BenfordGraph
          benford={benford}
          stats={stats}
          reset={() => setStats(undefined)}
        ></BenfordGraph>
      )}
    </>
  );
}
