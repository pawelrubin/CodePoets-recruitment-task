import { BenfordGraph } from "components/BenfordGraph";
import React, { useEffect, useState } from "react";

import { Project, SignificantDigitsStats } from "types";
import { Container, Item } from "./elements";
import { useBenford } from "hooks";

function ProjectItem({
  data,
  benford
}: {
  data: Project;
  benford: SignificantDigitsStats;
}) {
  return (
    <Item>
      <h1>{data.filename}</h1>
      <BenfordGraph benford={benford} stats={data.stats} />
    </Item>
  );
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const benford = useBenford();

  useEffect(() => {
    fetch("/api/project/all/")
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  return (
    <Container>
      {projects.map(project => (
        <ProjectItem data={project} benford={benford} />
      ))}
    </Container>
  );
}
