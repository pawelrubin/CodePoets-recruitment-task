import React from "react";
import { Link } from "react-router-dom";

import { StyledMenu } from "./elements";

export function Navbar() {
  return (
    <StyledMenu>
      <ul>
        <li>
          <Link to="/">Upload</Link>
        </li>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </StyledMenu>
  );
}
