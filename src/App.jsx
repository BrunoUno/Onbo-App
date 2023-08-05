import { BrowserRouter, Routes, Route } from "react-router-dom";
import WeekNavigationBar from "./WeekNavigationBar";
import WeekInfoSideBar from "./WeekInfoSideBar";
import WeeklyModuleTask from "./WeeklyModuleTask";
import Header from "./Header";
import { useState, useEffect } from "react";
import data from "./data";

function App() {
  const [weekData, setWeekData] = useState(data.weeks);
  const [position, setPosition] = useState("");
  const [weekSelector, setWeekSelector] = useState("");
  useEffect(() => {
    console.log(weekData);
  }, [weekData]);
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="container">
          <WeekNavigationBar
            weekData={weekData}
            position={position}
            setPosition={setPosition}
            weekSelector={weekSelector}
            setWeekSelector={setWeekSelector}
            setWeekData={setWeekData}
          />
          <Routes>
            <Route path="/" element={<p></p>}></Route>
            <Route
              path="/week/:id"
              element={
                <WeekInfoSideBar
                  weekData={weekData}
                  setWeekData={setWeekData}
                />
              }
            >
              <Route
                path="/week/:id/module/:mod_id"
                element={
                  <WeeklyModuleTask
                    weekData={weekData}
                    setWeekData={setWeekData}
                  />
                }
              ></Route>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
