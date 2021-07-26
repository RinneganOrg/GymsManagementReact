import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { Portal } from 'react-portal'
import { useSelector } from 'react-redux'
import EditButton from '../buttons/EditButton';
import Comments from "../comments/Comments";
import { Image, Menu, List, Header, Button, Label, Grid, Divider } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import '../../coursesStyle.css';

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
    <>
      {gymId ?
        <Button
          basic
          circular
          color='blue'
          icon='arrow left'
          as={Link}
          size="small"
          to={`/gyms/${gymId}/courses`}
        />
        : null}
      <Grid className="course-grid">
        <Grid.Column width={13} className="courseInformation">
          <Image src={courseToDisplay.image} className="course-image" />
        </Grid.Column>
        <Grid.Column width={3} className="courseIcons">
          <Header as='h2' className="course-header">
            <Label circular
              size="mini"
              className="course-label"
              style={{
                backgroundColor: `${courseToDisplay.color}`
              }}
            />
            {courseToDisplay.name}
          </Header>
          <Divider />
          <List>
            <List.Item className="course-icon">
              <Image avatar size="mini" src='data:image/png;base64,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' />
              <List.Content>
                <List.Header className="list-header-course">{`Duration:  ${courseToDisplay.duration} minutes`}</List.Header>
              </List.Content>
            </List.Item>
            <List.Item className="course-icon">
              <Image avatar size="mini" src='https://static.thenounproject.com/png/2334722-200.png'/>
              <List.Content>
                <List.Header className="list-header-course">Improves heart condition</List.Header>
              </List.Content>
              </List.Item>
            <List.Item className="course-icon">
              <Image avatar size="mini" src='https://static.thenounproject.com/png/199289-200.png' />
              <List.Content>
                <List.Header className="list-header-course">It's gonna be sweaty</List.Header>
              </List.Content>
              </List.Item>
          </List>
        </Grid.Column>
        <Grid.Row>
          <Header as="h5" className="course-header">{courseToDisplay.description}</Header>
        </Grid.Row>
      </Grid>

      <Header size="medium">Trainers</Header>
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
    </>
  );
}
export default Course;