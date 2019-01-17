
import React, { Component } from 'react';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import LanguageSelectionPopup from "./components/LanguageSelectionPopup/LanguageSelectionPopup";
import './App.css';
import PerformancesPage from './components/Performances/PerformancesPage';
import Stream from './components/Stream/Stream';

import { Router, Route, Switch } from 'react-router-dom';
import Aux from './hoc/Auxiliary';
import history from './history'
import MainLogin from './components/MainLogin/MainLogin';

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
                <Route path="/login" component={MainLogin} />
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

