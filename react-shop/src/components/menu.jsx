import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const HeaderMenu = () => (
    <Menu>
                    <Menu.Item
                        name='home'
                        //onClick={this.handleItemClick}
                    >
                        <Link to="/">
                            Home
                        </Link>
                    </Menu.Item>

                    <Menu.Item
                        name='catalog'
                        //onClick={this.handleItemClick}
                    >
                        <Link to="/catalog">
                            Catalog
                        </Link>
                    </Menu.Item>

                    <Menu.Menu position='right'>
                    <Menu.Item
                        className='user outline'
                        name='user outline'
                        //onClick={this.handleItemClick}
                    >
                        Sign Up
                    </Menu.Item>

                    <Menu.Item
                        name='cut'
                        //onClick={this.handleItemClick}
                    >
                        Cut
                    </Menu.Item>
                    </Menu.Menu>
                </Menu>
);

export default HeaderMenu;
