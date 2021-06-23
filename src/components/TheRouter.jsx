import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import About from "./about/About"
import Login from './login/Login'
import Gyms from './gyms/Gyms'
import Trainers from './trainers/Trainers'
import Trainer from './trainers/Trainer'
import Users from './users/Users'
import Profile from './profile/Profile'
import Gym from './gyms/Gym'
import GymForm from './gyms/GymForm'
import TrainerForm from './trainers/TrainerForm'
import Courses from './courses/Courses'
import Course from './courses/Course'
import PrivateRoute from './PrivateRoute'

const TheRouter = () => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route exact path="/gyms">
        <Gyms />
      </Route>
      <Route exact path="/trainers">
        <Trainers />
      </Route>
      <Route path="/trainers/add">
        <TrainerForm mode="add" />
      </Route>
      <Route exact path="/trainers/:trainerId">
        <Trainer />
      </Route>
      <Route path="/trainers/:trainerId/edit">
        <TrainerForm mode="edit"/>
      </Route>
      <PrivateRoute path="/users">
        <Users />
      </PrivateRoute>
      <PrivateRoute path="/profile">
        <Profile />
      </PrivateRoute>
      <Route exact path="/courses">
        <Courses />
      </Route>
      <Route exact path="/courses/:courseId">
        <Course />
      </Route>
      <Route path="/gyms/add">
        <GymForm mode="add"/>
      </Route>
      <Route exact path="/gyms/:gymId">
        <Gym />
      </Route>
      <Route path="/gyms/:gymId/edit">
        <GymForm mode="edit"/>
      </Route>
      <Route exact path="/gyms/:gymId/trainers">
        <Trainers />
      </Route>
      <Route path="/gyms/:gymId/trainers/add">
        <TrainerForm mode="add"/>
      </Route>
      <Route exact path="/gyms/:gymId/trainers/:trainerId">
        <Trainer />
      </Route>
      <Route path="/gyms/:gymId/trainers/:trainerId/edit">
        <TrainerForm mode="edit" />
      </Route>
      <Route exact path="/gyms/:gymId/courses">
        <Courses />
      </Route>
      <Route exact path="/gyms/:gymId/courses/:courseId">
        <Course />
      </Route>
    </Switch>
  )
}
export default TheRouter;