import React, { useEffect } from "react";
import {
  Link,
  useRouteMatch
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { addGym } from '../../store/actions/gyms'
// To Do 
// 1. show links from store
// 2. implement cards/list from store
// 3. fct de search
// 4. ordonare
// 5. filtrare

const Gyms = () => {

  const selectGyms = state => state.gyms
  const dispatch = useDispatch()
  const onAddGym = () => dispatch(addGym('WorldClass'))
  const gyms = useSelector(selectGyms)
  const showStore = () => console.log(gyms)

  useEffect(
    () => console.log("hi", gyms),
    [gyms],
  );
  let { path, url } = useRouteMatch();
  console.log("url gym", url)
  console.log("path gym", path)
  return (
    <div>
      <h2>Gyms</h2>
      <h3>Please select a gym.</h3>
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
      <button onClick={onAddGym}>Add gym</button>
      <button onClick={showStore}>Show store</button>
    </div>
  );
}
export default Gyms;