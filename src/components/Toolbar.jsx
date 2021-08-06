import React, { useEffect } from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { toolbarIsReady } from '../store/actions/toolbar'
import AuthButton from './AuthButton';
import { useAuth } from '../Utils/context';

const Toolbar = () => {
  const dispatch = useDispatch()
  // is mounted effect
  useEffect(
    () => dispatch(toolbarIsReady()),
    [],
  );
  let auth = useAuth();
  return (
    <Menu vertical icon borderless className="flexed">
      {auth && auth.role === "admin" ?
        <Menu.Item>
          <Menu.Menu id="operationSection">
          </Menu.Menu>
        </Menu.Item> : null}
      <Menu.Item>
        <Menu.Menu id="childrenSection">
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item>
        <Menu.Menu id="contentSection">
        </Menu.Menu>
      </Menu.Item>
      <Dropdown item icon='grey big user circle' simple>
        <Dropdown.Menu>
          <AuthButton />
          {auth ?
            <Dropdown.Item
              icon='settings'
              text='Profile'
              as={Link} to={`/profile/${auth._id}`}/>
            : null}
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  )
}
export default Toolbar