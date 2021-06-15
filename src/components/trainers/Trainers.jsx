import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { addTrainer } from '../../store/actions/trainers'

const Trainers = () => {

  const selectTrainers = state => state.trainers
  const dispatch = useDispatch()
  const onAddTrainer = () => dispatch(addTrainer('Mason Mount'))
  const trainers = useSelector(selectTrainers)
  const showStore = () => console.log(trainers)

  useEffect(
    () => console.log("hi", trainers),
    [trainers],
  );

  return (
    <div>
      <h2>Trainers</h2>
      <button onClick={onAddTrainer}>Add trainer</button>
      <button onClick={showStore}>Show store</button>
    </div>
  )
}
export default Trainers;