import React, { useState } from "react";
import { BenfordStats } from "types";
import { BenfordForm } from "components/BenfordForm";
import { BenfordGraph } from "components/BenfordGraph";

export function Main() {
  const [stats, setStats] = useState<BenfordStats>();

  return (
    <>
      <BenfordForm setStats={setStats}></BenfordForm>
      {stats && <BenfordGraph stats={stats}></BenfordGraph>}
    </>
  );
}
