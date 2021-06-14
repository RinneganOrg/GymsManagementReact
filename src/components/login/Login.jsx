import React from 'react'
import {
  useHistory,
  useLocation
} from "react-router-dom";
import { useAuth } from '../../Utils/context';

const Login = () => {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    auth.signin(() => {
      history.replace(from);
    });
  };
  return (
  <div>
  <p>You must log in to view the page at {from.pathname}</p>
  <button onClick={login}>Log in</button>
  </div>
  )
}
export default Login;