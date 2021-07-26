import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../../store/actions/users'
import gymsApi from '../../api/gyms'
const Users = () => {
  const selectUsers = state => state.users
  const dispatch = useDispatch()
  const onAddUser = () => dispatch(addUser('Dana Comiselu'))
  const [gyms, setGyms] = useState([])
  const users = useSelector(selectUsers)

  const displayGyms = async () => {
    const response = await gymsApi.getAllGyms()
    setGyms(response.data.data)
}
  useEffect(() => 
  displayGyms(),
  []
  )
  return (
    <div>
      <h2>Users</h2>
      {gyms.length>0?
      gyms.map(gym => <p key={gym._id}>{gym.name}</p>):null}
      <button onClick={onAddUser}>Add user</button>
    </div>
  )
}
export default Users;