import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { Portal } from 'react-portal'
import { useSelector } from 'react-redux'
import EditButton from '../buttons/EditButton';
import Comments from "../comments/Comments";
import { Image, Menu, List, Header, Button, Grid } from 'semantic-ui-react'
import { Link } from "react-router-dom";

const Course = () => {
  let { courseId, gymId } = useParams()
  const courseToDisplay = useSelector(state =>
    state.courses.courses.find(course => course.id + '' === courseId)
  )
  const trainersToDisplay = useSelector(state =>
    state.trainers.trainers.filter(trainer => courseToDisplay.trainersId.includes(trainer.id))
  )
  const location = useLocation()
  const selectIsToolbarReady = state => state.toolbar
  const { isToolbarReady } = useSelector(selectIsToolbarReady)

  return (
    <div>
      {gymId ?
        <Button
          transparent
          color='blue'
          icon='backward'
          as={Link}
          size="mini"
          to={`/gyms/${gymId}/courses`}
          label={{ basic: true, color: 'blue', pointing: 'none', content: 'Back to courses' }}
        />
        : null}
      <h2 style={{ textAlign: 'center' }}>{courseToDisplay.name}</h2>
      <Image src={courseToDisplay.image} size='medium' centered />
      <p style={{ textAlign: 'center' }}>{courseToDisplay.description}</p>

      <Header size="small">Trainers</Header>
      <List horizontal>
        {trainersToDisplay.map(trainer =>
          <List.Item
            as={Link}
            to={`${location.pathname}/trainers/${trainer.id}`}
            key={trainer.id} >
            <Image avatar src={trainer.image} />
            <List.Content>
              <List.Header>{trainer.name}</List.Header>
            </List.Content>
          </List.Item>
        )}
      </List>

      <Comments courseId={courseToDisplay.id} />

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
export default Course;