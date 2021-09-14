import React, { useState } from "react";
import Header from "./Header";
import "./css/app.css";
import Timetable from "./Timetable";
const App = () => {
  const [next, setNext] = useState(1);
  const [curr, setCurr] = useState(0);
  const [isTransitioning, setTransition] = useState(false);
  return (
    <main>
      <Header
        setNext={setNext}
        isTransitioning={isTransitioning}
        setTransition={setTransition}
      />
      <Timetable
        next={next}
        curr={curr}
        setCurr={setCurr}
        isTransitioning={isTransitioning}
        setTransition={setTransition}
      />
    </main>
  );
};

export default App;
