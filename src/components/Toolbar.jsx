import React, { useState, useEffect } from 'react'
import { Menu, Button, Dropdown } from 'semantic-ui-react'
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
    <Menu vertical icon borderless className="flexed">
      <Menu.Item>
        <Menu.Menu id="operationSection">
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item>
        <Menu.Menu id="contentSection">
        </Menu.Menu>
      </Menu.Item>
      <Dropdown item icon='grey big user circle' simple>
        <Dropdown.Menu>
          <Dropdown.Item
            icon='sign-in'
            text='Login'
            as={Link} to="/login" />
          <Dropdown.Item
            icon='settings'
            text='Profile'
            as={Link} to="/profile" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  )
}
export default Toolbar