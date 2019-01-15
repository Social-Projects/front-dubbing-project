
import React, { Component } from 'react';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Perfomance from './Perfomance/Perfomance';
import LanguageSelectionPopup from "./components/LanguageSelectionPopup/LanguageSelectionPopup";
import './App.css';
import PerformancesPage from './components/Performances/PerformancesPage';
import { Router, Route, Switch } from 'react-router-dom'
import history from './history'

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
            </Switch>
          </Router>
          <LanguageSelectionPopup
                buttonLabel="Керувати мовами дубляжу"></LanguageSelectionPopup>{/*popup for language management. Created by reactstrap. Props here https://reactstrap.github.io/components/modals/ */}
        </main>
      </div>
    );
  }
}
export default App;