import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../../store/actions/users'

const Users = () => {
  const selectUsers = state => state.users
  const dispatch = useDispatch()
  const onAddUser = () => dispatch(addUser('Dana Comiselu'))
  const users = useSelector(selectUsers)
  const showStore = () => console.log(users)

  useEffect(
    () => console.log("hi", users),
    [users],
  );

  return (
    <div>
      <h2>Users</h2>
      <button onClick={onAddUser}>Add user</button>
      <button onClick={showStore}>Show store</button>
    </div>
  )
}
export default Users;