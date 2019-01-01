import React, { Component } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Perfomance from './components/Perfomance/Perfomance';
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
