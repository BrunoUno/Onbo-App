import WeekButton from "./WeekButton";
import Popup from "reactjs-popup";

export default function WeekNavigationBar(props) {
  const {
    weekData,
    position,
    weekSelector,
    setPosition,
    setWeekSelector,
    setWeekData,
  } = props;

  function CreateWeekOnClickHandler() {
    let index;
    if (weekData.length < 10) {
      if (weekSelector !== "") {
        if (position === "Before") {
          index = parseInt(weekSelector) - 1;
        } else if (position === "After") {
          index = parseInt(weekSelector);
        }
        if (position !== "") {
          const newWeekData = [
            ...weekData.slice(0, index),
            { id: weekData.length + 1, week_number: index + 1, modules: [] },
            ...weekData.slice(index).map((week) => {
              week.week_number = week.week_number + 1;
              return week;
            }),
          ];
          setWeekData(newWeekData);
        }
      }
    }
  }

  return (
    <>
      <div className="week-navigation-bar">
        <ul>
          {weekData.map((week, index) => {
            return (
              <li key={week.week_number}>
                <WeekButton weekNumber={week.week_number} weekId={week.id} />
              </li>
            );
          })}
        </ul>
        <Popup
          trigger={
            <div className="add-week-btn">
              <i className="fa-regular fa-calendar"></i>
              <button>Add a new week</button>
            </div>
          }
          modal
        >
          {(close) => (
            <div className="pop-up-container">
              <div className="title">
                <p>Add Week</p>
              </div>
              <div className="pop-up-select">
                <select
                  value={position}
                  onChange={(event) => setPosition(event.target.value)}
                  className="dropdown"
                >
                  <option value="">Order</option>
                  <option>Before</option>
                  <option>After</option>
                </select>
                <select
                  value={weekSelector}
                  onChange={(event) => setWeekSelector(event.target.value)}
                  className="dropdown"
                >
                  <option value="">Week</option>
                  {weekData.map((week, index) => {
                    return (
                      <option key={index} value={week.week_number}>
                        Week {week.week_number}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="message">
                <p>
                  {position !== "" &&
                  weekSelector !== "" &&
                  weekData.length < 10
                    ? `Next week will be added ${position} week${weekSelector}`
                    : ""}
                  {weekData.length === 10 ? `Max limit reached` : ""}
                </p>
              </div>
              <div className="pop-up-buttons-select">
                <button
                  className="week-btn"
                  onClick={() => {
                    CreateWeekOnClickHandler();
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
          )}
        </Popup>
      </div>
    </>
  );
}
