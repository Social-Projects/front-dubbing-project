import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/Toolbar/Header/Header';
import Sidebar from './components/Toolbar/Sidebar/Sidebar';
import PerformancesPage from './components/Performances/PerformancesPage';
import Stream from './components/Stream/Stream';
import Login from './components/Login/Login';
import Aux from './hoc/Auxiliary';
import LanguageSelectionPopup from "./components/LanguageSelectionPopup/LanguageSelectionPopup";

class App extends Component {
  render() {
    return (
      <Aux>
        <Header />
        <main>
          <Sidebar />
          <Switch>
            <Route path="/login" component={Login} />
            <Route exact path="/" component={PerformancesPage} />
            <Route path="/performance" component={PerformancesPage} />
            <Route path="/event"
                   render={() => <h1 style={{textAlign: 'center'}}>This section in development mode!</h1>}/>
            <Route exact path="/stream/:number" component={Stream} />
          </Switch>
        </main>
      </Aux>
    );
  }
}

export default App;