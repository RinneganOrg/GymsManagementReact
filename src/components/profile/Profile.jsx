import React, { useState } from "react";
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { Menu, Icon } from 'semantic-ui-react'
import { Portal } from 'react-portal'
import CoursesCalendar from "../CoursesCalendar";

const Profile = () => {
  let { userId } = useParams();
  const users = useSelector(state => state.users.users
    .filter(user => user.id + '' === userId))
  const courses = useSelector(state =>
    state.courses.courses)
  const trainers = useSelector(state =>
    state.trainers.trainers)
  const activities = useSelector(state =>
    state.activities.activities).filter(activity => activity.userIds.includes(parseInt(userId)))
  const userActivities = activities.map((activity) => {
    const course = courses.find(courseItem => courseItem.id === activity.courseId)
    const trainer = trainers.find(trainerItem => trainerItem.trainerId === activity.trainerId)
    return Object.assign({}, activity, { ...course }, { ...trainer })
  })
  const selectIsToolbarReady = state => state.toolbar
  const { isToolbarReady } = useSelector(selectIsToolbarReady)

  const [displaySection, setDisplaySection] = useState(false)
  const changeDisplayedSection = () => {
    setDisplaySection(!displaySection)
  }
  return <>
  <h3>Hello hi this is your profile</h3>
    {isToolbarReady &&
      <Portal node={document.getElementById("operationSection")}>
        <Menu.Item>
          <Icon
            name="calendar alternate outline"
            size="big"
            color="black"
            onClick={() => changeDisplayedSection("calendar")} />
        </Menu.Item>
      </Portal>
    }
    {displaySection ?
      <CoursesCalendar userId={userId} /> : null}
  </>
}
export default Profile;