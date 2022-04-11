import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { useAuth } from '../Utils/context';

const TheHeader = () => {
  const [activeItem, setActiveItem] = useState('Gyms');
  const handleItemClick = (e, { name }) => setActiveItem(name)
  let auth = useAuth();

  return (
      <Menu fixed="top">
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
        {auth && auth.role === "admin" ?
          <Menu.Item
            name='Users'
            active={activeItem === 'Users'}
            onClick={handleItemClick}
            as={Link} to="/users">Users
          </Menu.Item> : null}
      </Menu>
  )
}
export default TheHeader;