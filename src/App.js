import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import "./App.css";

const App = ({ data }) => {
  const [libs, setLibs] = useState([...new Set(data.map(o => o.library))]);
  return <Button>Hi</Button>;
};

export default App;
