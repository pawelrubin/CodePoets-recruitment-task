import { BenfordGraph } from "components/BenfordGraph";
import React, { useEffect, useState } from "react";

import { Project, SignificantDigitsStats } from "types";
import { Container, Item } from "./elements";
import { useBenford } from "hooks";
import { Loading } from "components/Loading";

function ProjectItem({
  data,
  benford,
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
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/project/all/")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <Loading />
  ) : projects.length > 0 ? (
    <Container>
      {projects.map((project) => (
        <ProjectItem data={project} benford={benford} />
      ))}
    </Container>
  ) : (
    <h1>No projects yet</h1>
  );
}
