import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import About from "./about/About"
import Login from './login/Login'
import Gyms from './gyms/Gyms'
import Trainers from './trainers/Trainers'
import Users from './users/Users'
import Suppliers from './suppliers/Suppliers'
import Products from './products/Products'
import PrivateRoute from './PrivateRoute'

const TheRouter = () => {

  return (
    <Switch>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/gyms">
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
    </Switch>
  )
}
export default TheRouter;