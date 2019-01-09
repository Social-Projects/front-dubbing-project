import React from 'react';
import Logo from './Logo';
import Logout from './Logout';
import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <header id="header">
                <Logo text="Театр ляльок" />
                <Logout />
            </header>
        )
    }
}

export default Header;