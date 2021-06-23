import React, { useState } from 'react';
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from "react-router-dom";
// TO DO
// 1. de scos login si about done
const TheHeader = () => {

  const [activeItem, setActiveItem] = useState('Gyms');
  const handleItemClick = (e, { name }) => setActiveItem(name)
  
  return (
    <Segment >
      <Menu secondary>
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
      </Menu>
    </Segment>
  )
}
export default TheHeader;