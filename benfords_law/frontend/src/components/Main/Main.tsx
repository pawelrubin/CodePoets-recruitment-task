import React, { useState } from "react";
import { BenfordStats } from "types";
import { BenfordForm } from "components/BenfordForm";
import { BenfordGraph } from "components/BenfordGraph";
import { useBenford } from "hooks";

export function Main() {
  const [stats, setStats] = useState<BenfordStats>();
  const benford = useBenford();

  return !stats ? (
    <BenfordForm setStats={setStats} />
  ) : (
    <BenfordGraph
      benford={benford}
      stats={stats}
      reset={() => setStats(undefined)}
    />
  );
}
