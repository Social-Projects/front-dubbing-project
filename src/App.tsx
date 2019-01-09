import React, { Component } from 'react';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Perfomance from './Perfomance/Perfomance';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <Sidebar />
          <Perfomance />
        </main>
      </div>
    );
  }
}

export default App;
