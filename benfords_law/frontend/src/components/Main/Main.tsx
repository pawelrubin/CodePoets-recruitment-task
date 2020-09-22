import React, { useState } from "react";
import { BenfordStats } from "types";
import { BenfordForm } from "components/BenfordForm";
import { BenfordGraph } from "components/BenfordGraph";

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
