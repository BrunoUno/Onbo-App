import { NavLink } from "react-router-dom";
import { useRef, useEffect } from "react";

export default function WeekButton(props) {
  const { weekNumber, weekId } = props;
  const button = useRef();
  useEffect(() => {
    if (weekNumber === 1) {
      button.current.click();
    }
  }, [weekNumber]);
  return (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive ? "week-btn active" : "week-btn"
        }
        to={`/week/${weekId}`}
        ref={button}
      >
        Week {weekNumber}
      </NavLink>
    </>
  );
}
