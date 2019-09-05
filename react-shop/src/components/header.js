import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './header.css';

class Header extends React.Component {
    render() {
        return(
            <div className="header">
                <Link to="/" rel="home">
                    <img className="logo" src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/c039b824474525.56334ce736de9.jpg" alt="logoBOOK"></img>
                </Link>
                <nav className="nav">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/catalog">Catalog</Link></li>
                    </ul>
                </nav>
            </div>
        );
    };
}

export default connect()(Header);
