import { useParams, Outlet } from "react-router-dom";
import WeeklyModule from "./WeeklyModule";
import WeeklyModuleTask from "./WeeklyModuleTask";

export default function WeekInfoSideBar(props) {
  const { weekData, setWeekData } = props;
  const params = useParams();
  const filteredWeek = weekData.filter(
    (week) => week.id === parseInt(params.id)
  );
  const filteredWeekData = weekData.find(
    (week) => week.id === parseInt(params.id)
  );
  return (
    <>
      <div className="main-area">
        <div className="side-bar">
          <p>{filteredWeekData && `Week ${filteredWeekData?.week_number}`}</p>
          {filteredWeek.map((week, index) => {
            return (
              <WeeklyModule
                modules={week.modules}
                weekData={weekData}
                key={index}
                weekId={params.id}
                setWeekData={setWeekData}
              />
            );
          })}
        </div>
        <div className="center-area">
          <p className="center-area-header">Task</p>
          <Outlet context={WeeklyModuleTask} />
        </div>
      </div>
    </>
  );
}
