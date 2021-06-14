import React from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Gym from './Gym'

const Gyms = () => {

  let { path, url } = useRouteMatch();

  return (
    <div>
      <h2>Gyms</h2>
      <ul>
        <li>
          <Link to={`${url}/WorldClass`}>WorldClass</Link>
        </li>
        <li>
          <Link to={`${url}/FitClass`}>FitClass</Link>
        </li>
        <li>
          <Link to={`${url}/SanGym`}>SanGym</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path={path}>
          <h3>Please select a gym.</h3>
        </Route>
        <Route path={`${path}/:gymId`}>
          <Gym />
        </Route>
      </Switch>
    </div>
  );
}
export default Gyms;