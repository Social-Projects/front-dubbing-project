import React, { Component } from "react";
import Header from './components/Header/Header';
import Play from './components/Play/Play';
import Logo from './components/Logo/img/logo.png';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <Play/>
        </main>
      </div>
    );
  }
}

export default App;
