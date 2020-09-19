import React from "react";
import "./App.css";
import { BenfordGraph } from "./components/BenfordGraph/BenfordGraph";

const mockData = {
  "1": 0.293966887077759,
  "2": 0.1816597467835358,
  "3": 0.11999589932851504,
  "4": 0.09467425290891383,
  "5": 0.07991183556307345,
  "6": 0.0702239991798657,
  "7": 0.059767286893228765,
  "8": 0.053411246091547494,
  "9": 0.04628632938643703,
};

function App() {
  return <BenfordGraph stats={mockData}></BenfordGraph>;
}

export default App;
