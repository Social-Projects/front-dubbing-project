<<<<<<< HEAD
import React, { Component } from 'react';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Perfomance from './Perfomance/Perfomance';
import './App.css';
import PerformancesPage from './components/Performances/PerformancesPage';
import { Router, Route, Switch } from 'react-router-dom'
import history from './history'
import MainLogin from './components/MainLogin/MainLogin';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <Sidebar />
          <Router history={history} >
        <Switch>
                <Route exact path="/" component={PerformancesPage} />
                <Route path="/performance" component={PerformancesPage} />
                <Route path="/login" component={MainLogin} />
        </Switch>
        </Router>
        </main>
      </div>         
    );
  }
}

export default App;
