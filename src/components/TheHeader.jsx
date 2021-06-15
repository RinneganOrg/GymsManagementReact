import React, { useState } from 'react';
import { Menu, Segment } from 'semantic-ui-react'
import { Link, useRouteMatch } from "react-router-dom";
// TO DO
// 1. de scos login si about
const TheHeader = () => {

  const [activeItem, setActiveItem] = useState('About');
  const handleItemClick = (e, { name }) => setActiveItem(name)
  console.log(activeItem)
  let { path, url } = useRouteMatch();
  console.log("url header", url)
  console.log("url path", path)
  return (
    <Segment >
      <Menu secondary>
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
          name='Gyms'
          active={activeItem === 'Gyms'}
          onClick={handleItemClick}
          as={Link} to="/gyms">Gyms
      </Menu.Item>

        <Menu.Item
          name='Trainers'
          active={activeItem === 'Trainers'}
          onClick={handleItemClick}
          as={Link} to="/trainers">Trainers
        </Menu.Item>

        <Menu.Item
          name='Users'
          active={activeItem === 'Users'}
          onClick={handleItemClick}
          as={Link} to="/users">Users
        </Menu.Item>

        <Menu.Item
          name='Suppliers'
          active={activeItem === 'Suppliers'}
          onClick={handleItemClick}
          as={Link} to="/suppliers">Suppliers
        </Menu.Item>

        <Menu.Item
          name='Products'
          active={activeItem === 'Products'}
          onClick={handleItemClick}
          as={Link} to="/products">Products
        </Menu.Item>
      </Menu>
    </Segment>
  )
}
export default TheHeader;