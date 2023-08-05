import { useState } from "react";
import { NavLink } from "react-router-dom";
import Popup from "reactjs-popup";

export default function WeeklyModule(props) {
  const [newModule, setNewModule] = useState("");
  const { modules, weekId, weekData, setWeekData } = props;
  function CreateNewModuleOnClickHandler() {
    if (newModule.trim() !== "") {
      const newModules = [
        ...modules,
        { id: `mod${modules.length + 1}`, name: newModule },
      ];
      const newWeekData = weekData.map((week) => {
        if (week.id === parseInt(weekId)) {
          week.modules = newModules;
        }
        return week;
      });
      setWeekData(newWeekData);
      setNewModule("");
    }
  }

  return (
    <>
      {modules.map((module, index) => {
        return (
          <div key={index} className="side-bar-items">
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to={`/week/${weekId}/module/${module.id}`}
            >
              {module.name}
            </NavLink>
          </div>
        );
      })}

      <Popup
        trigger={
          <div className="add-button">
            <button>Add Module</button>
          </div>
        }
        modal
      >
        {(close) => (
          <div className="popup-overlay">
            <div className="pop-up-container">
              <div className="title">
                <p>Add Module</p>
              </div>
              <div className="pop-up-textbox">
                <input
                  type="text"
                  value={newModule}
                  onChange={(event) => setNewModule(event.target.value)}
                  className="input-textbox"
                />
              </div>
              <div className="pop-up-buttons">
                <button
                  className="week-btn"
                  onClick={() => {
                    CreateNewModuleOnClickHandler();
                    close();
                  }}
                >
                  Create
                </button>
                <button
                  className="week-btn"
                  onClick={() => {
                    close();
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </Popup>
    </>
  );
}
