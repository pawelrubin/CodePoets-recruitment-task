import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { About } from "components/About";
import { Main } from "components/Main";
import { Navbar } from "components/Navbar";
import { Projects } from "components/Projects";

import { GlobalStyles } from "./global";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Router>
          <Navbar />
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
        </Router>
      </>
    </ThemeProvider>
  );
}

export default App;
