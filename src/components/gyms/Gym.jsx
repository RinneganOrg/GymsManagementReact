import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { Portal } from 'react-portal'
import { useSelector } from 'react-redux'
import EditButton from '../buttons/EditButton';
import AccessCoursesButton from "../buttons/AccessCoursesButton";
import AccessTrainersButton from "../buttons/AccessTrainersButton";
import Comments from "../comments/Comments";
import { Image, Menu } from 'semantic-ui-react'

const Gym = () => {
  let { gymId } = useParams();
  const gymToDisplay = useSelector(state =>
    state.gyms.gyms.find(gym => gym.id + '' === gymId)
  )
  const location = useLocation()
  const selectIsToolbarReady = state => state.toolbar
  const { isToolbarReady } = useSelector(selectIsToolbarReady)

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
        </>
      }
    </div>
  );
}
export default Gym;