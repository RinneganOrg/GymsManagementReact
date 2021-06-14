import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { addGym } from '../../store/actions/gyms'

const Gyms = () => {

  const selectGyms = state => state.gyms
  const dispatch = useDispatch()
  const onAddGym = () => dispatch(addGym('WorldClass'))
  const gyms = useSelector(selectGyms)
  const showStore = () => console.log(gyms)

  let { gymId } = useParams();

  useEffect(
    () => console.log("hi", gyms),
    [gyms],
  );

  return (
    <div>
      <h3>You chose {gymId}</h3>
      <button onClick={onAddGym}>My button</button>
      <button onClick={showStore}>Show store</button>
    </div>
  );
}
export default Gyms;