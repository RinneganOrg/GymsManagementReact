import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Portal } from 'react-portal'
import { useSelector } from 'react-redux'
import EditButton from '../buttons/EditButton';
import AccessCoursesButton from "../buttons/AccessCoursesButton";
import AccessTrainersButton from "../buttons/AccessTrainersButton";
import Comments from "../comments/Comments";
import GymGraphScatter from "../GymGraphScatter";
import { Image, Menu } from 'semantic-ui-react'
import GymBarGraphHorizontal from "../GymBarGraphHorizontal";

const Gym = () => {
  let { gymId } = useParams();
  const gymToDisplay = useSelector(state =>
    state.gyms.gyms.find(gym => gym.id + '' === gymId)
  )
  const location = useLocation()
  const selectIsToolbarReady = state => state.toolbar
  const { isToolbarReady } = useSelector(selectIsToolbarReady)

  const [selectedMonth, setSelectedMonth] = useState(1);
  const handleChangeCourseBars = (month) => {
    setSelectedMonth(month)
    console.log({ month })
  }
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>{gymToDisplay.name}</h2>
      <Image src={gymToDisplay.image} size='medium' centered />
      <p style={{ textAlign: 'center' }}>{gymToDisplay.description}</p>
      <Comments gymId={gymToDisplay.id} />
      {isToolbarReady &&
        <>
          <Portal node={document.getElementById("operationSection")}>
            <Menu.Item>
              <EditButton path={location.pathname} />
            </Menu.Item>
          </Portal>
          <Portal node={document.getElementById("contentSection")}>
            <Menu.Item>
              <AccessTrainersButton path={location.pathname} />
            </Menu.Item>
            <Menu.Item>
              <AccessCoursesButton path={location.pathname} />
            </Menu.Item>
          </Portal>
          <GymBarGraphHorizontal gymId={gymId} selectedMonth={selectedMonth} />
          <GymGraphScatter gymId={gymId} handleChangeCourseBars={handleChangeCourseBars} />
        </>
      }
    </div>
  );
}
export default Gym;