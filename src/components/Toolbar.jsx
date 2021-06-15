import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'
// TO DO
// 1. options for pages
// 2. add user
// 3. buton de save cancel add edit

const Toolbar = () => {

  const [activeItem, setActiveItem] = useState({});
  const handleItemClick = (e, { name }) => setActiveItem(name)
  console.log(activeItem)
    return (
      <Menu vertical>
        <Menu.Item>
          <Menu.Header>Products</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name='enterprise'
              active={activeItem === 'enterprise'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='consumer'
              active={activeItem === 'consumer'}
              onClick={handleItemClick}
            />
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>CMS Solutions</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name='rails'
              active={activeItem === 'rails'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='python'
              active={activeItem === 'python'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='php'
              active={activeItem === 'php'}
              onClick={handleItemClick}
            />
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    )
}
export default Toolbar