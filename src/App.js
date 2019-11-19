import React, { useState } from "react";
import BtnBar from "./components/btnBar";
import "./App.css";

const App = ({ data }) => {
  const libs = [...new Set(data.map(o => o.library))];
  const [activeLib, setActiveLib] = useState(libs[0]);
  const handleLibClick = e => {
    e.preventDefault();
    console.log(e.target.innerHTML);
  };

  return (
    <main>
      <BtnBar
        handleClick={handleLibClick}
        activeLib={activeLib}
        libraries={libs}
      />
    </main>
  );
};

export default App;
