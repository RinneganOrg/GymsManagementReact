import React from 'react'
import { useHistory } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { signOut } from '../store/actions/users'
import { Dropdown } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { useAuth } from '../Utils/context';

function AuthButton() {

  const history = useHistory();
  let auth = useAuth()
  const dispatch = useDispatch()
  return auth ?
    <Dropdown.Item
      icon='sign-out'
      text='Sign Out'
      onClick={() => {
        dispatch(signOut())
        history.push("/signin")
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