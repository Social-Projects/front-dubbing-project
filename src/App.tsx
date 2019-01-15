import React, { Component } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import PerformancesPage from './components/Performances/PerformancesPage';
import Stream from './components/Stream/Stream';
import { Router, Route, Switch } from 'react-router-dom';
import Aux from './hoc/Auxiliary';
import history from './history'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <Router history={history} >
            <Aux>
              <Sidebar />
              <Switch>
                <Route exact path="/" component={PerformancesPage} />
                <Route path="/performance" component={PerformancesPage} />
                <Route path="/stream" component={Stream} />
              </Switch>
            </Aux>
          </Router>
        </main>
      </div>
    );
  }
}

export default App;