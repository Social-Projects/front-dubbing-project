import React from 'react';
import Logo from '../Logo/Logo';
import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <header id="header">
                <Logo />
            </header>
        )
    }
}

export default Header;