import { useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import { useState } from "react";

export default function WeeklyModuleTask(props) {
  const [newTask, setNewTask] = useState("");
  const { weekData, setWeekData } = props;

  const params = useParams();
  const filteredWeek = weekData.find((week) => week.id === parseInt(params.id));
  const filteredWeekModules = filteredWeek?.modules.find(
    (module) => module.id === params.mod_id
  );
  //console.log(filteredWeekModules.tasks);
  function CreateNewTaskOnClickHandler() {
    if (newTask.trim() !== "") {
      const newFilteredTask = [
        ...(filteredWeekModules?.tasks ?? []),
        {
          id: `task${
            (filteredWeekModules?.tasks
              ? filteredWeekModules?.tasks?.length
              : 0) + 1
          }`,
          name: newTask,
        },
      ];
      const newWeekData = weekData.map((week) => {
        if (week.id === parseInt(params.id)) {
          week.modules.map((module) => {
            if (module.id === params.mod_id) {
              module.tasks = newFilteredTask;
            }
            return module;
          });
        }
        return week;
      });
      setWeekData(newWeekData);
      setNewTask("");
    }
  }

  return (
    <>
      {filteredWeekModules?.tasks &&
        filteredWeekModules?.tasks.map((task, index) => {
          return <p key={index}>{task.name}</p>;
        })}
      <Popup
        trigger={
          <div className="add-button">
            <button>Add Task</button>
          </div>
        }
        modal
      >
        {(close) => (
          <div className="pop-up-container">
            <div className="title">
              <p>Add Task</p>
            </div>
            <div className="pop-up-textbox">
              <input
                type="text"
                value={newTask}
                onChange={(event) => setNewTask(event.target.value)}
                className="input-textbox"
              />
            </div>
            <div className="pop-up-buttons">
              <button
                className="week-btn"
                onClick={() => {
                  CreateNewTaskOnClickHandler();
                  close();
                }}
              >
                Create
              </button>
              <button
                onClick={() => {
                  close();
                }}
                className="week-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Popup>
    </>
  );
}
