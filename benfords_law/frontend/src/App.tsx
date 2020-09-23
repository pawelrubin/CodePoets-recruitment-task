import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { About } from "components/About";
import { Main } from "components/Main";
import { Navbar } from "components/Navbar";
import { Projects } from "components/Projects";
import { Loading } from "components/Loading";

import { GlobalStyles } from "./global";
import { theme } from "./theme";
import { SignificantDigitsStats } from "types";
import { BenfordContext } from "hooks";

function App() {
  const [benford, setBenford] = useState<SignificantDigitsStats>();

  useEffect(() => {
    fetch("/api/benford/assert_stats/")
      .then((res) => res.json())
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
              <Loading />
            ) : (
              <BenfordContext.Provider value={benford}>
                <Switch>
                  <Route path="/projects">
                    <Projects />
                  </Route>
                  <Route path="/about">
                    <About />
                  </Route>
                  <Route path="/">
                    <Main />
                  </Route>
                </Switch>
              </BenfordContext.Provider>
            )}
          </main>
        </Router>
      </>
    </ThemeProvider>
  );
}

export default App;
