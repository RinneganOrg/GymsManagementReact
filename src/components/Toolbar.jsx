import React, { useState, useEffect } from 'react'
import { Menu, Button } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { toolbarIsReady } from '../store/actions/toolbar'

const Toolbar = () => {
  const [activeItem, setActiveItem] = useState({});
  const handleItemClick = (e, { name }) => setActiveItem(name)
  const dispatch = useDispatch()

  // is mounted effect
  useEffect(
    () => dispatch(toolbarIsReady()),
    [],
  );

  return (
    <Menu vertical borderless compact={true} className="flexed">
      <Menu.Item>
        <Menu.Menu id="operationSection">
        </Menu.Menu>
      </Menu.Item>

      <Menu.Item>
        <Menu.Menu id="contentSection">
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item
        name='About'
        active={activeItem === 'About'}
        onClick={handleItemClick}
        as={Link} to="/about">About
      </Menu.Item>
      <Menu.Item
        name='Login'
        active={activeItem === 'Login'}
        onClick={handleItemClick}
        as={Link} to="/login">Login
      </Menu.Item>
      <Menu.Item
        name='Profile'
        active={activeItem === 'Profile'}
        onClick={handleItemClick}
        as={Link} to="/profile"> <Button circular icon='user' />
      </Menu.Item>
    </Menu>
  )
}
export default Toolbar