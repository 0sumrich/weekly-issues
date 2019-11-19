import React, { useState } from "react";
import BtnBar from "./components/btnBar";
import Chart from "./components/chart";
import weekly from "./draw/weekly";
import "./App.css";

const App = ({ data }) => {
  const libs = [...new Set(data.map(o => o.library))];
  const [activeLib, setActiveLib] = useState(libs[0]);

  const handleLibClick = e => {
    e.preventDefault();
    setActiveLib(e.target.innerHTML);
  };

  const filter = data => data.filter(o => o.library === activeLib);

  return (
    <main>
      <BtnBar
        handleClick={handleLibClick}
        activeLib={activeLib}
        libraries={libs}
      />
      <Chart draw={weekly} id="weekly" data={filter(data)} />
    </main>
  );
};

export default App;
