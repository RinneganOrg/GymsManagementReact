import React, { useState } from 'react'
import {
  useNavigate,
  useLocation,
  Link
} from "react-router-dom";
import { Button, Form, Input, Card, Icon, Dropdown, Message } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { signUp, signIn } from '../../store/reducers/users'
import { useCookies } from "react-cookie";

const roleOptions = [
  {
    key: 'user',
    text: 'User',
    value: 'user',
  },
  {
    key: 'admin',
    text: 'Admin',
    value: 'admin',
  }]
const Authenticate = ({ mode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/gyms" } };
  const dispatch = useDispatch()
  const authenticateMode = {
    signIn: () => dispatch(signIn("http://localhost:8000/users/signin", { email, password })),
    signUp: () => dispatch(signUp("http://localhost:8000/users/signup", { email, password, repeatPassword, role }))
  }

  const [cookies, setCookie] = useCookies(["name"]);
  const login = () =>
    authenticateMode[mode]().then((response) => {
      setCookie("token", response.accessToken);
      if (response.status) {
        navigate(from, {replace: true})
      }
      else setMessage(response.message)
    })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [role, setRole] = useState('user')
  const [message, setMessage] = useState('')

  const changeRole = (e, { value }) => {
    setRole(value)
  }

  const changeEmail = (event) => {
    setEmail(event.target.value)
  }
  const changePassword = (event) => {
    setPassword(event.target.value)
  }
  const changeRepeatPassword = (event) => {
    setRepeatPassword(event.target.value)
  }

  return (
    <div>
      <Card centered>
        <Card.Content textAlign="center">
          <Icon name="user circle" size="huge" />
        </Card.Content>
        <Card.Content textAlign="center">
          <Card.Header>{mode === "signIn" ? "Sign in" : "Sign up"}</Card.Header>
        </Card.Content>
        <Card.Content>
          <Form>
            <Form.Field>
              <label>Email</label>
              <Input
                value={email}
                onChange={changeEmail} />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <Input
                value={password}
                onChange={changePassword} />
            </Form.Field>
            {mode !== "signIn" ?
              <>
                <Form.Field>
                  <label>Repeat Password</label>
                  <Input
                    value={repeatPassword}
                    onChange={changeRepeatPassword} />
                </Form.Field>
                <Form.Field>
                  <label>Role</label>
                  <Dropdown
                    fluid
                    selection
                    options={roleOptions}
                    value={role}
                    onChange={changeRole}
                  />
                </Form.Field>
              </>
              : null}
            <Card.Content textAlign="right">
              <Button
                basic
                circular
                icon='arrow right'
                onClick={login}
                color="blue" />
            </Card.Content>
          </Form>
          {message ?
            <Message negative>
              <Message.Header>{message}</Message.Header>
            </Message> : null}
        </Card.Content>
      </Card>
      <Card centered>
        <Card.Content textAlign="center">
          {mode === "signIn" ?
            <Link to="/signup">
              Don't have an account? Register here!
            </Link>
            :
            <Link to="/signin">
              Already have an account? Sign in!
            </Link>
          }
        </Card.Content>
      </Card>
    </div >
  )
}
export default Authenticate;