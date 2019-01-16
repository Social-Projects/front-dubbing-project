import React, { Component } from 'react';
import './MainLogin.css';
import Logo from '../Logo/img/logo.png';
import Login from '../Login/Login';

class MainLogin extends React.Component{

    render(){ 
        return(
            
    <div className="App">
         <img className="logoImg" width="200px" src={Logo} alt=""/>
         <Login/>
    </div>
    )
  }
}

export default MainLogin;