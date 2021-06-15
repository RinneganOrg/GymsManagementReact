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
import Suppliers from './suppliers/Suppliers'
import Products from './products/Products'
import Gym from './gyms/Gym'
import PrivateRoute from './PrivateRoute'

const TheRouter = () => {

  let { path, url } = useRouteMatch();
  console.log("path header", path)
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
      <PrivateRoute path="/suppliers">
        <Suppliers />
      </PrivateRoute>
      <Route path="/products">
        <Products />
      </Route>
      <Route path="/gyms/:gymId">
        <Gym />
      </Route>
    </Switch>
  )
}
export default TheRouter;