import React from "react";
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
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
  return (
    <CoursesCalendar userId={userId}/>
  )
}
export default Profile;