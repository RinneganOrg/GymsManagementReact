import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActivitiesAsync } from "../../store/reducers/activities";
import { setCoursesAsync } from "../../store/reducers/courses";
import { setTrainersAsync } from "../../store/reducers/trainers";
import AttenanceGraph from "./AttendanceGraph";
import RevenueGraph from "./RevenueGraph";

function Graphs({ gymId, modal }) {
  const [wantedCourse, setWantedCourse] = useState(null);
  const [currentColor, setCurrentColor] = useState(null);

  const dispatch = useDispatch();
  const activities = useSelector(state =>
    state.activities.activities.filter(
      (activity) => activity.gymId + "" === gymId
    )
  );
  const courses = useSelector((state) =>
    state.courses.courses.filter((course) => course.gymId + "" === gymId)
  );
  const trainers = useSelector((state) =>
    state.trainers.trainers.map((trainer) => ({
      trainerGymId: trainer.gymId,
      trainerId: trainer._id,
      trainerName: trainer.name,
      trainerImage: trainer.image,
    }))
  );
  useEffect(() => {
    dispatch(setCoursesAsync(`http://localhost:8000/courses`));
    dispatch(setTrainersAsync(`http://localhost:8000/trainers`));
    dispatch(setActivitiesAsync("http://localhost:8000/activities"));
  }, []);
  return (
    <>
      <RevenueGraph
        activities={activities}
        courses={courses}
        wantedCourse={wantedCourse}
        setWantedCourse={setWantedCourse}
        currentColor={currentColor}
        setCurrentColor={setCurrentColor}
      />
      <br />
      <AttenanceGraph
        activities={activities}
        courses={courses}
        selectedCourse={wantedCourse}
        selectedColor={currentColor}
        trainers={trainers}
        modal={modal}
      />
    </>
  );
}

export default Graphs;
