import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import Authenticate from './authenticate/Authenticate'
import Gyms from './gyms/Gyms'
import Trainers from './trainers/Trainers'
import Trainer from './trainers/Trainer'
import Users from './users/Users'
import Profile from './profile/Profile'
import Gym from './gyms/Gym'
import GymForm from './gyms/GymForm'
import TrainerForm from './trainers/TrainerForm'
import CourseForm from './courses/CourseForm'
import Courses from './courses/Courses'
import Course from './courses/Course'
import PrivateRoute from './PrivateRoute'

const TheRouter = () => {

  return (
    <Switch>
      <Route path="/signin">
        <Authenticate mode="signIn" />
      </Route>
      <Route path="/signup">
        <Authenticate mode = "signUp"/>
      </Route>
      <Route exact path="/gyms">
        <Gyms />
      </Route>
      <Route exact path="/trainers">
        <Trainers />
      </Route>
      <PrivateRoute path="/trainers/add">
        <TrainerForm mode="add" />
      </PrivateRoute>
      <Route exact path="/trainers/:trainerId">
        <Trainer />
      </Route>
      <PrivateRoute path="/trainers/:trainerId/edit">
        <TrainerForm mode="edit" />
      </PrivateRoute>
      <PrivateRoute path="/users">
        <Users />
      </PrivateRoute>
      <PrivateRoute path="/profile/:userId">
        <Profile />
      </PrivateRoute>
      <PrivateRoute path="/gyms/add">
        <GymForm mode="add" />
      </PrivateRoute>
      <Route exact path="/gyms/:gymId">
        <Gym />
      </Route>
      <PrivateRoute path="/gyms/:gymId/edit">
        <GymForm mode="edit" />
      </PrivateRoute>
      <Route exact path="/gyms/:gymId/trainers">
        <Trainers />
      </Route>
      <PrivateRoute path="/gyms/:gymId/trainers/add">
        <TrainerForm mode="add" />
      </PrivateRoute>
      <Route exact path="/gyms/:gymId/trainers/:trainerId">
        <Trainer />
      </Route>
      <PrivateRoute path="/gyms/:gymId/trainers/:trainerId/edit">
        <TrainerForm mode="edit" />
      </PrivateRoute>
      <Route exact path="/gyms/:gymId/courses">
        <Courses />
      </Route>
      <PrivateRoute path="/gyms/:gymId/courses/add">
        <CourseForm mode="add" />
      </PrivateRoute>
      <Route exact path="/gyms/:gymId/courses/:courseId">
        <Course />
      </Route>
      <Route exact path="/gyms/:gymId/courses/:courseId/trainers/:trainerId">
        <Trainer />
      </Route>
      <PrivateRoute exact path="/gyms/:gymId/courses/:courseId/trainers/:trainerId/edit">
        <TrainerForm mode="edit" />
      </PrivateRoute>
      <PrivateRoute path="/gyms/:gymId/courses/:courseId/edit">
        <CourseForm mode="edit" />
      </PrivateRoute>
    </Switch>
  )
}
export default TheRouter;