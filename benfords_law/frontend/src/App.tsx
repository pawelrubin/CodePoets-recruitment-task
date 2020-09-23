import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { About } from "components/About";
import { Main } from "components/Main";
import { Navbar } from "components/Navbar";
import { Projects } from "components/Projects";

import { GlobalStyles } from "./global";
import { theme } from "./theme";
import { SignificantDigitsStats } from "types";

function App() {
  const [benford, setBenford] = useState<SignificantDigitsStats>();

  useEffect(() => {
    fetch("/api/benford/assert_stats/")
      .then(res => res.json())
      .then((data: SignificantDigitsStats) => {
        setBenford(data);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Router>
          <Navbar />

          <main>
            {!benford ? (
              <h1>LOADING</h1>
            ) : (
              <Switch>
                <Route path="/projects">
                  <Projects benford={benford} />
                </Route>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/">
                  <Main benford={benford} />
                </Route>
              </Switch>
            )}
          </main>
        </Router>
      </>
    </ThemeProvider>
  );
}

export default App;
