import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import HeaderMenu from './menu';
import './header.css';

class Header extends React.Component {
    render() {
        return(
            <Container className="header">
                <Link to="/" rel="home">
                    <img className="logo" src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/c039b824474525.56334ce736de9.jpg" alt="logoBOOK"></img>
                </Link>
                <HeaderMenu />
            </Container>
        );
    };
}

export default connect()(Header);
