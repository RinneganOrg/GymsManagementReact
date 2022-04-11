import { configureStore } from '@reduxjs/toolkit'
import middleware from './middleware'
import gymsReducer from './reducers/gyms'
import trainersReducer from './reducers/trainers'
import coursesReducer from './reducers/courses'
import activitiesReducer from './reducers/activities'
import commentsReducer from './reducers/comments'
import usersReducer from './reducers/users'
import toolbarReducer from './reducers/toolbar'

export default configureStore({
  reducer: {
    gyms: gymsReducer,
    trainers: trainersReducer,
    courses: coursesReducer,
    activities: activitiesReducer,
    comments: commentsReducer,
    users: usersReducer,
    toolbar: toolbarReducer
  },
  middleware: [middleware()]
})