import React from 'react';
import './Logo.css';
import logo from './img/logo.png';

class Logo extends React.Component {
    render() {
        return (
            <img src={logo} className="header-logo"/>
                      
        )
    }
}

export default Logo;