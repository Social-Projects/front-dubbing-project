import React from 'react';
import Logo from '../Logo/Logo';
import Logout from '../Logout/Logout';
import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <header id="header">
                <Logo />
                <Logout />
            </header>
        )
    }
}

export default Header;