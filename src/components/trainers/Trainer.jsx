import React from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { Portal } from 'react-portal'
import { useSelector } from 'react-redux'
import EditButton from '../buttons/EditButton';
import Comments from "../comments/Comments";
import { Image, Menu, Button, Grid, Divider, Header } from 'semantic-ui-react'
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
    <>
      {gymId && courseId ?
        <Button
          basic
          circular
          icon='arrow left'
          color="blue"
          as={Link}
          to={`/gyms/${gymId}/courses/${courseId}`}
          size="small" />
        :
        (gymId && courseId === undefined ?
          <Button
            basic
            circular
            icon='arrow left'
            color="blue"
            as={Link}
            to={`/gyms/${gymId}/trainers`}
            size="small" />
          : null)}

      <Grid className="trainer-grid">
        <Grid.Column width={12} className="trainerInformation">
          <Image src={trainerToDisplay.image} className="trainer-image" />
        </Grid.Column>
        <Grid.Column width={4} centered>
          <Header as='h2' className="trainers-header">
            {trainerToDisplay.name}
          </Header>
          <Divider />
          <Header as="h5" className="trainers-header">{trainerToDisplay.description}</Header>
        </Grid.Column>
      </Grid>
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
    </>
  );
}
export default Trainer;