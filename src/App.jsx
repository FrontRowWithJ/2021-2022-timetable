import React, { useState } from "react";
import Header from "./Header";
import "./css/app.css";
import Timetable from "./Timetable";
import { today } from "./util";

const App = () => {
  const [next, setNext] = useState();
  const day = today.getDay() - 1;
  const [curr, setCurr] = useState(day < 0 || day > 4 ? 0 : day);
  const [isTransitioning, setTransition] = useState(false);
  return (
    <main>
      <Header
        setNext={setNext}
        isTransitioning={isTransitioning}
        setTransition={setTransition}
        curr={curr}
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
