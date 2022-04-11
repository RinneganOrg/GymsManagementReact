import React from 'react'
import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { signOut } from '../store/reducers/users'
import { Dropdown } from 'semantic-ui-react'
import { useAuth } from '../Utils/context';

function AuthButton() {

  const navigate = useNavigate();
  const auth = useAuth()
  const dispatch = useDispatch()
  return auth ?
    <Dropdown.Item
      icon='sign-out'
      text='Sign Out'
      onClick={() => {
        dispatch(signOut())
        navigate("/signin")
      }
      }
    /> :
    <Dropdown.Item
      icon='sign-in'
      text='Sign In'
      as={Link} to="/signin"
    />
}
export default AuthButton