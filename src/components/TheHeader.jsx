import React, { useState } from 'react';
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from "react-router-dom";


const TheHeader = () => {
  const [activeItem, setActiveItem] = useState('About');

  const handleItemClick = (e, { name }) => setActiveItem(name)

  return (
  <Segment >
    <Menu pointing secondary>
      <Menu.Item
        name='About'
        active={activeItem === 'About'}
      >
        <Link to="/about">About</Link>
      </Menu.Item>

      <Menu.Item
        name='Login'
        active={activeItem === 'Login'}
      >
        <Link to="/login">Login</Link>
      </Menu.Item>

      <Menu.Item
        name='Gyms'
        active={activeItem === 'Gyms'}
      >
        <Link to="/gyms">Gyms</Link>
      </Menu.Item>

      <Menu.Item
        name='Trainers'
        active={activeItem === 'Trainers'}
      >
        <Link to="/trainers">Trainers</Link>
      </Menu.Item>

      <Menu.Item
        name='Users'
        active={activeItem === 'Users'}
      >
        <Link to="/users">Users</Link>
      </Menu.Item>

      <Menu.Item
        name='Suppliers'
        active={activeItem === 'Suppliers'}
      >
        <Link to="/suppliers">Suppliers</Link>
      </Menu.Item>

      <Menu.Item
        name='Products'
        active={activeItem === 'Products'}
      >
        <Link to="/products">Products</Link>
      </Menu.Item>
    </Menu>
  </Segment>
  )
}
export default TheHeader;