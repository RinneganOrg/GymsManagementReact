import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Portal } from 'react-portal'
import { useSelector } from 'react-redux'
import EditButton from '../buttons/EditButton';
import AccessCoursesButton from "../buttons/AccessCoursesButton";
import AccessTrainersButton from "../buttons/AccessTrainersButton";
import Comments from "../comments/Comments";
import GymGraphScatter from "../GymGraphScatter";
import { Image, Menu, Icon } from 'semantic-ui-react'
import GymBarGraphHorizontal from "../GymBarGraphHorizontal";
import CoursesCalendar from "../CoursesCalendar";
import '../../gymsStyle.css'

const Gym = () => {

  let { gymId } = useParams();
  const gymToDisplay = useSelector(state =>
    state.gyms.gyms.find(gym => gym.id + '' === gymId)
  )
  const location = useLocation()
  const selectIsToolbarReady = state => state.toolbar
  const { isToolbarReady } = useSelector(selectIsToolbarReady)

  const [selectedMonth, setSelectedMonth] = useState(1)
  const [displayedSection, setDisplayedSection] = useState("reviews")

  const handleChangeCourseBars = (month) => {
    setSelectedMonth(month)
  }
  const changeDisplayedSection = (section) => {
    setDisplayedSection(section)
  }
  return (
    <div>
      <h2 className="gym-header">{gymToDisplay.name}</h2>
      <Image src={gymToDisplay.image} size='medium' centered />
      <p className="gym-header">{gymToDisplay.description}</p>
      {isToolbarReady &&
        <>
          <Portal node={document.getElementById("operationSection")}>
            <Menu.Item>
              <EditButton path={location.pathname} />
            </Menu.Item>
          </Portal>
          <Portal node={document.getElementById("childrenSection")}>
            <Menu.Item>
              <AccessTrainersButton path={location.pathname} />
            </Menu.Item>
            <Menu.Item>
              <AccessCoursesButton path={location.pathname} />
            </Menu.Item>
            </Portal>
          <Portal node={document.getElementById("contentSection")}>
            <Menu.Item>
              <Icon
                name="calendar alternate outline"
                size="big"
                color="black"
                onClick={() => changeDisplayedSection("calendar")} />
            </Menu.Item>
            <Menu.Item>
              <Icon
                name="thumbs up outline"
                size="big"
                color="black"
                onClick={() => changeDisplayedSection("reviews")} />
            </Menu.Item>
            <Menu.Item>
              <Icon
                name="chart line"
                size="big"
                color="black"
                onClick={() => changeDisplayedSection("graphs")} />
            </Menu.Item>
          </Portal>
        </>}
          {displayedSection === "calendar"?
          <CoursesCalendar gymId={gymId} />:
          displayedSection === "graphs"?
          <>
          <GymBarGraphHorizontal gymId={gymId} selectedMonth={selectedMonth} />
          <GymGraphScatter gymId={gymId} handleChangeCourseBars={handleChangeCourseBars} />
          </>:
          <Comments gymId={gymToDisplay.id} />
          }
      
    </div>
  );
}
export default Gym;