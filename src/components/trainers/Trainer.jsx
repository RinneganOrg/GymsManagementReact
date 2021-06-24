import React from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { Portal } from 'react-portal'
import { useSelector } from 'react-redux'
import EditButton from '../buttons/EditButton';
import Comments from "../comments/Comments";
import { Image, Menu, Button } from 'semantic-ui-react'

const Trainer = () => {
  let { trainerId, gymId, courseId } = useParams()
  const trainerToDisplay = useSelector(state =>
    state.trainers.trainers.find(trainer => trainer.id + '' === trainerId))
    const course = useSelector(state => state.courses.courses
      .find(course => course.id + '' === courseId))
  const location = useLocation()
  const selectIsToolbarReady = state => state.toolbar
  const { isToolbarReady } = useSelector(selectIsToolbarReady)

  return (
    <div>
      {gymId && courseId ?
        <Button icon="backward" label={`Back to ${course.name}`} as={Link} to={`/gyms/${gymId}/courses/${courseId}`} size="tiny" />
        :
        (gymId && courseId === undefined ?
          <Button icon="backward" label="Back to trainers" as={Link} to={`/gyms/${gymId}/trainers`} size="tiny" />
          : null)}
      <h2 style={{ textAlign: 'center' }}>{trainerToDisplay.name}</h2>
      <Image src={trainerToDisplay.image} size='medium' centered />
      <p style={{ textAlign: 'center' }}>{trainerToDisplay.description}</p>
      <Comments trainerId={trainerToDisplay.id} />
      {isToolbarReady &&
        <>
          <Portal node={document.getElementById("operationSection")}>
            <Menu.Item>
              <EditButton path={location.pathname} />
            </Menu.Item>
          </Portal>
        </>
      }
    </div>
  );
}
export default Trainer;