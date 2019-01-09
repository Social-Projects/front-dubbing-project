import React, { Component } from 'react';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Perfomance from './Perfomance/Perfomance';
import './App.css';
import PerformancesPage from './components/Performances/PerformancesPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <Sidebar />
          <Router>
        <Switch>
                <Route exact path="/" component={PerformancesPage} />
                <Route path="/performance" component={PerformancesPage} />
        </Switch>
        </Router>
        </main>
       
      </div>
     
    
        
    );
  }
}

export default App;