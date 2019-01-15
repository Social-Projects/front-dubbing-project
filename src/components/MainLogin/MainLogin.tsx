import React from 'react';
import Logo from './components/Logo/img/logo.png';
import Login from './components/Login/Login';
import './MainLogin.css'

class MainLogin extends React.Component {
    render() {
        return (
            <div className="App">
            <img className="logoImg" width="200px" src={Logo} alt=""/>
            <Login/>
            </div>
        )
    }
}

export default MainLogin;