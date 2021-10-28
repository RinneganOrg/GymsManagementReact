import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { setUsers } from "../../store/actions/users";
import { Card, List, Menu, Input, Dropdown} from 'semantic-ui-react'

const Users = () => {
  const dispatch = useDispatch()
  const selectUsers = state => state.users.usersList
  const users = useSelector(selectUsers)
  const [displayStyle, setDisplayStyle] = useState(false)
  const [userSearched, setUserSearched] = useState('')
  const [orderCriteria, setOrderCriteria] = useState(false)
  const [filterCriteria, setFilterCriteria] = useState("email")

  const onChangeDisplay = () => setDisplayStyle(!displayStyle)
  const changeFilterCriteria = (filter) => {
    setUserSearched('')
    setFilterCriteria(filter)
  }
  const changeOrderCriteria = () => {
    setOrderCriteria(!orderCriteria)
  }
  const onSearchUser = (event) => {
    setUserSearched(event.target.value)
  }

  const filterUsers = (user) => {
    if (filterCriteria === "role") {
      return user.role.toLowerCase().includes(userSearched.toLowerCase())
    }
    else
      return user.email.toLowerCase().includes(userSearched.toLowerCase())
  }
  const orderUsers = (user1, user2) => {
    return user1.email > user2.email ? 1 : -1
  }
  useEffect(
    () => dispatch(setUsers()),
    []
  )
  return (
    <div>
      <h2>Users</h2>
      <Menu icon secondary>
        <Input
          icon='search'
          placeholder='Search...'
          onChange={onSearchUser}
          value={userSearched} />

        <Dropdown item icon='filter'>
          <Dropdown.Menu>
            <Dropdown.Item
              icon='edit'
              text='Filter by email'
              onClick={() => changeFilterCriteria("email")} />
            <Dropdown.Item
              icon='tag'
              text='Filter by role'
              onClick={() => changeFilterCriteria("role")} />
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown item icon='sort'>
          <Dropdown.Menu>
            <Dropdown.Item
              icon='sort alphabet down'
              text='Order by name'
              onClick={() => changeOrderCriteria()} />
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown item icon='block layout'>
          <Dropdown.Menu>
            <Dropdown.Item
              icon='list layout'
              text='List'
              onClick={onChangeDisplay} />
            <Dropdown.Item
              icon='grid layout'
              text='Grid'
              onClick={onChangeDisplay} />
          </Dropdown.Menu>
        </Dropdown>
      </Menu>

      {displayStyle === true ?
        <List selection verticalAlign='middle'>
          {users && users.length >= 0 ?
            users.filter(user =>
              filterUsers(user))
              .sort((user1, user2) => orderUsers(user1, user2))
              .map((user) => (
                <List.Item key={user._id}>
                  <List.Content>
                    <List.Header>{user.email}</List.Header>
                    <List.Description>
                      <span>Role: {user.role}</span>
                    </List.Description>
                  </List.Content>
                </List.Item>
              )) : null}
        </List>
        :
        <Card.Group itemsPerRow={3}>
          {users && users.length >= 0 ?
            users.filter(user =>
              filterUsers(user))
              .sort((user1, user2) => orderUsers(user1, user2))
              .map((user) => (
                <Card key={user._id}>
                  <Card.Content>
                    <Card.Header>{user.email}</Card.Header>
                    <Card.Meta>
                      <span>Role: {user.role}</span>
                    </Card.Meta>
                  </Card.Content>
                </Card>
              )) : null}
        </Card.Group>
      }
      <br />
    </div>
  );
}
export default Users;