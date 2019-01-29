import React from 'react';
import './Logo.css';

interface LogoProps {
    text: string
}

class Logo extends React.PureComponent<LogoProps> {
    render() {
        return (
            <button className="header-logo">
                {this.props.text}
            </button>
        )
    }
}

export default Logo;