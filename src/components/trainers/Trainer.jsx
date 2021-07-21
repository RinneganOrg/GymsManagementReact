import React from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { Portal } from 'react-portal'
import { useSelector } from 'react-redux'
import EditButton from '../buttons/EditButton';
import Comments from "../comments/Comments";
import { Image, Menu, Button } from 'semantic-ui-react'
import '../../trainersStyle.css'

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
        <Button
        transparent="true"
          icon="backward"
          color="blue"
          label={{ basic: true, color: 'blue', pointing: 'none', content: `Back to ${course.name}` }}
          as={Link}
          to={`/gyms/${gymId}/courses/${courseId}`}
          size="mini" />
        :
        (gymId && courseId === undefined ?
          <Button
            icon="backward"
            transparent="true"
            color="blue"
            label={{ basic: true, color: 'blue', pointing: 'none', content: 'Back to trainers' }}
            as={Link}
            to={`/gyms/${gymId}/trainers`}
            size="mini" />
          : null)}
      <h2 className="trainers-header">{trainerToDisplay.name}</h2>
      <Image src={trainerToDisplay.image} size='medium' centered />
      <p className="trainers-header" >{trainerToDisplay.description}</p>
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