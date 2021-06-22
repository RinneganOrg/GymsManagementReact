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
import Users from './users/Users'
import Profile from './profile/Profile'
import Suppliers from './suppliers/Suppliers'
import Products from './products/Products'
import Gym from './gyms/Gym'
import GymForm from './gyms/GymForm'
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
      <Route path="/trainers">
        <Trainers />
      </Route>
      <PrivateRoute path="/users">
        <Users />
      </PrivateRoute>
      <PrivateRoute path="/profile">
        <Profile />
      </PrivateRoute>
      <PrivateRoute path="/suppliers">
        <Suppliers />
      </PrivateRoute>
      <Route path="/products">
        <Products />
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
      <Route path="/gyms/:gymId/trainers">
        <Trainers />
      </Route>
      <Route path="/gyms/:gymId/suppliers">
        <Suppliers />
      </Route>
    </Switch>
  )
}
export default TheRouter;