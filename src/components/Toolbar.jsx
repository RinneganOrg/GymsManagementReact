import React, { useState, useEffect } from 'react'
import { Menu, Button } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { toolbarIsReady } from '../store/actions/toolbar'

// TO DO
// 1. options for pages done for gyms
// 2. add user
// 3. buton de save cancel add edit -- adaugate dar tre sa faca altceva
// history de inlocuit cu link -cancel
const Toolbar = () => {
  const location = useLocation();
  const history = useHistory();
  const [activeItem, setActiveItem] = useState({});
  const handleItemClick = (e, { name }) => setActiveItem(name)
  console.log(activeItem)
  const pathnames = ["/gyms", "/trainers", "/users", "/suppliers", "/products"]

  const selectGyms = state => state.gyms
  const { gyms } = useSelector(selectGyms)
  const dispatch = useDispatch()
  //TO DO
  // rewrite better

  const canEditItem = () => {
    let routeExists = false
    for (let index = 0; index < gyms.length; index++) {
      if (location.pathname === "/gyms/" + gyms[index].name) {
        routeExists = true
        break
      }
    }
    return routeExists
  }

  const saveGym = () => {
    // if (location.pathname.includes('/add')) {
    //   console.log("location", location)
    //   dispatch(addGym(location.state))
    //history.goBack()
    //}
  }
// is mounted effect
  useEffect(
    () => dispatch(toolbarIsReady()),
    [],
  );

  const shouldShowAddButton = () => pathnames.includes(location.pathname)
  const isEditingMode = () => location.pathname.includes('/edit') || location.pathname.includes('/add')

  const makeOperationButtons = () => (
    shouldShowAddButton() ?
      (<Menu.Item>
        <Link to={"/gyms/add"}>
          <button>Add</button>
        </Link>
      </Menu.Item>)
      : (canEditItem()) ?
        (<Menu.Item>
          <Link to={`${location.pathname}/edit`}>
            <button>Edit</button>
          </Link>
        </Menu.Item>) :
        isEditingMode() ?
          (<>
            <Menu.Item>
              <button onClick={saveGym}>Save</button>
            </Menu.Item>
            <Menu.Item>
              <button onClick={history.goBack}>Cancel</button>
            </Menu.Item>
          </>) : null
  )

  const makeContentButtons = () => (
    canEditItem() ?
      <>
        <Menu.Item>
          <Link to={`${location.pathname}/trainers`}>
            <button>
              Trainers
            </button>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={`${location.pathname}/suppliers`}>
            <button>
              Suppliers
            </button>
          </Link>
        </Menu.Item>
      </>
      : null
  )

  return (
    <Menu vertical borderless compact= {true} className="flexed">
      <Menu.Item>
        <Menu.Menu id="operationSection">
          {/* {makeOperationButtons()} */}
        </Menu.Menu>
      </Menu.Item>

      <Menu.Item>
        <Menu.Menu id="contentSection">
          {/* {makeContentButtons()} */}
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