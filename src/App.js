import React, { Component } from 'react';
import Header from './components/Header/Header';
import Logo from './components/Logo/img/logo.png';
import Login from './components/Login/Login';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <main>
        <img className="logoImg" width="200px" src={Logo} alt=""/>
        <Login/>
        </main>
      </div>
    );
  }
}

export default App;
