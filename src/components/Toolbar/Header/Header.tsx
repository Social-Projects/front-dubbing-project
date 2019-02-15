import React from 'react';
import Logo from './Logo/Logo';
import Logout from './Logout/Logout';
import './Header.css';

interface HeaderState {
    isAuthorized: boolean;
}

class Header extends React.Component<{}, HeaderState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            isAuthorized: false
        };
    }

    static getDerivedStateFromProps (props: {}, state: HeaderState) {
        const segments = location.pathname.split('/');
        const newState = {
            ...state
        };

        if (segments[1] === 'login') {
            newState.isAuthorized = false;  
        }
         else if (segments[1] === 'register') {
            newState.isAuthorized = false;  
        }
        else {
            newState.isAuthorized = true;
        }

        return newState;
    }

    render() {
        const logout = this.state.isAuthorized ? <Logout /> : null;

        return (
            <header id="header">
                <Logo text="Театр ляльок" />
                {logout}
            </header>
        )
    }
}

export default Header;