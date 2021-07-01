import React, { useState } from "react";
import {
  Link,
  useRouteMatch,
  useLocation,
  useParams
} from "react-router-dom";
import { useSelector } from 'react-redux'
import { Card, Image, List, Menu, Rating, Input, Dropdown, Button } from 'semantic-ui-react'
import AddButton from '../buttons/AddButton';
import { Portal } from 'react-portal'

const Courses = () => {
  const location = useLocation()
  const params = useParams()

  const [displayStyle, setDisplayStyle] = useState(false);
  const [courseSearched, setCourseSearched] = useState('');
  const [filterCriteria, setFilterCriteria] = useState("name");
  const [orderCriteria, setOrderCriteria] = useState("name");

  const onChangeDisplay = () => setDisplayStyle(!displayStyle)
  const selectCourses = state => state.courses.courses
    .filter(course => params.gymId ? course.gymId + '' === params.gymId : true)
  const courses = useSelector(selectCourses)
  const gym = useSelector(state => state.gyms.gyms
    .find(gym => gym.id + '' === params.gymId))
  const selectIsToolbarReady = state => state.toolbar
  const { isToolbarReady } = useSelector(selectIsToolbarReady)
  const onSearchCourse = (event) => {
    setCourseSearched(event.target.value)
  }
  const changeFilterCriteria = (filter) => {
    setCourseSearched('')
    setFilterCriteria(filter)
  }
  const changeOrderCriteria = (criteria) => {
    setOrderCriteria(criteria)
  }
  const filterCourses = (course) => {
    if (filterCriteria === "name") {
      return course.name
        .toLowerCase()
        .includes(courseSearched.toLowerCase().trim())
    }
    else if (filterCriteria === "tag") {
      return !!course.tags
        .find(tag => tag
          .toLowerCase()
          .includes(courseSearched.toLowerCase().trim()))
    }
  }
  const orderCourses = (course1, course2) => {
    if (orderCriteria === "name") {
      return course1.name > course2.name ? 1 : -1
    }
    else if (orderCriteria === "rating") {
      return course1.rating > course2.rating ? 1 : -1
    }
    else if (orderCriteria === "reviews") {
      return course1.reviews.length > course2.reviews.length ? 1 : -1
    }
  }

  let { url } = useRouteMatch()

  return (
    <div>
      {params.gymId ?
        <Button
          icon="backward"
          transparent
          color="blue"
          label={{ basic: true, color: 'blue', pointing: 'none', content: `Back to ${gym.name}` }}
          as={Link}
          to={`/gyms/${params.gymId}`}
          size="mini" />
        : null}
      <h2>Courses</h2>
      <Menu icon secondary>
        <Input
          icon='search'
          placeholder='Search...'
          onChange={onSearchCourse}
          value={courseSearched} />
        <Dropdown item icon='filter'>
          <Dropdown.Menu>
            <Dropdown.Item
              icon='edit'
              text='Filter by name'
              onClick={() => changeFilterCriteria("name")} />
            <Dropdown.Item
              icon='tag'
              text='Filter by tag'
              onClick={() => changeFilterCriteria("tag")} />
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown item icon='sort'>
          <Dropdown.Menu>
            <Dropdown.Item
              icon='sort alphabet down'
              text='Order by name'
              onClick={() => changeOrderCriteria("name")} />
            <Dropdown.Item
              icon='sort numeric down'
              text='Order by rating'
              onClick={() => changeOrderCriteria("rating")} />
            <Dropdown.Item
              icon='sort amount down'
              text='Order by reviews'
              onClick={() => changeOrderCriteria("reviews")} />
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown item icon='block layout'>
          <Dropdown.Menu>
            <Dropdown.Item
              icon='list layout'
              text='List'
              onClick={onChangeDisplay} />
            <Dropdown.Item
              icon='grid layout'
              text='Grid'
              onClick={onChangeDisplay} />
          </Dropdown.Menu>
        </Dropdown>
      </Menu>

      {displayStyle === true ?
        <div>
          <h3>Please select a course.</h3>
          <List selection verticalAlign='middle'>
            {courses.filter(filterCourses)
              .sort((course1, course2) => orderCourses(course1, course2))
              .map((course) => (
                <List.Item key={course.id}>
                  <Image avatar src={course.image} />
                  <List.Content>
                    <List.Header as={Link} to={`${url}/${course.id}`}>{course.name}</List.Header>
                    <Rating icon='star' defaultRating={course.rating} maxRating={5} disabled />
                    {course.tags.map((tag, index) =>
                      <p key={index}>{tag}</p>
                    )}
                  </List.Content>
                </List.Item>
              ))}
          </List>
        </div>
        :
        <div>
          <h3>Please select a course.</h3>
          <Card.Group itemsPerRow={3}>
            {courses.filter(course =>
              filterCourses(course))
              .sort((course1, course2) => orderCourses(course1, course2))
              .map((course) => (
                <Card key={course.id} as={Link} to={`${url}/${course.id}`}>
                  <Image src={course.image} wrapped ui={false} />
                  <Card.Content>
                    <Card.Header>{course.name}</Card.Header>
                    <Card.Meta>
                      {course.tags.map((tag, index) =>
                        <p key={index}>{tag}</p>
                      )}
                      <Rating icon='star' defaultRating={course.rating} maxRating={5} disabled />
                    </Card.Meta>
                  </Card.Content>
                </Card>
              ))}
          </Card.Group>
        </div>
      }
      {isToolbarReady &&
        <Portal node={document.getElementById("operationSection")}>
          <Menu.Item>
            <AddButton path={location.pathname} />
          </Menu.Item>
        </Portal>}
      <br />
    </div>
  )
}
export default Courses;