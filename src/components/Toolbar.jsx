import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class Toolbar extends Component {
  state = {}
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu vertical>
        <Menu.Item>
          <Menu.Header>Products</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name='enterprise'
              active={activeItem === 'enterprise'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='consumer'
              active={activeItem === 'consumer'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>CMS Solutions</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name='rails'
              active={activeItem === 'rails'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='python'
              active={activeItem === 'python'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='php'
              active={activeItem === 'php'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    )
  }
}