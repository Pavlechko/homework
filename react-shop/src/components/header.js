import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Menu } from 'semantic-ui-react'

import './header.css';

class Header extends React.Component {
    render() {
        return(
            <div className="header">
                <Link to="/" rel="home">
                    <img className="logo" src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/c039b824474525.56334ce736de9.jpg" alt="logoBOOK"></img>
                </Link>
                <Menu>
                    <Menu.Item
                        name='home'
                        onClick={this.handleItemClick}
                    >
                        <Link to="/">
                            Home
                        </Link>
                    </Menu.Item>

                    <Menu.Item
                        name='catalog'
                        onClick={this.handleItemClick}
                    >
                        <Link to="/catalog">
                            Catalog
                        </Link>
                    </Menu.Item>

                    <Menu.Menu position='right'>
                    <Menu.Item
                        name='signup'
                        onClick={this.handleItemClick}
                    >
                        Sign Up
                    </Menu.Item>

                    <Menu.Item
                        name='cut'
                        onClick={this.handleItemClick}
                    >
                        Cut
                    </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </div>
        );
    };
}

export default connect()(Header);
