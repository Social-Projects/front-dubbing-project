import React from 'react';
import './Logo.css';

interface LogoProps {
    text: string
}

class Logo extends React.Component<LogoProps> {
    render() {
        return (
            <a href="index.html" className="header-logo">
                {this.props.text}
            </a>
        )
    }
}

export default Logo;