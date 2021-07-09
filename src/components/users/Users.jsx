import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../../store/actions/users'

const Users = () => {
  const selectUsers = state => state.users
  const dispatch = useDispatch()
  const onAddUser = () => dispatch(addUser('Dana Comiselu'))
  const users = useSelector(selectUsers)

  return (
    <div>
      <h2>Users</h2>
      <button onClick={onAddUser}>Add user</button>
    </div>
  )
}
export default Users;