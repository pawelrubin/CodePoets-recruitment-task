import React, { useState } from "react";
import { BenfordStats } from "types";
import { BenfordForm } from "components/BenfordForm";
import { BenfordGraph } from "components/BenfordGraph";
import { Container } from "./elements";

export function Main() {
  const [stats, setStats] = useState<BenfordStats>();

  return (
    <Container>
      {!stats ? (
        <BenfordForm setStats={setStats}></BenfordForm>
      ) : (
        <BenfordGraph stats={stats}></BenfordGraph>
      )}
    </Container>
  );
}
