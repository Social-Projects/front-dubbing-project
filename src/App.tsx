import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Toolbar/Header/Header';
import Sidebar from './components/Toolbar/Sidebar/Sidebar';
import PerformancesPage from './components/Performances/PerformancesPage';
import Stream from './components/Stream/Stream';
import Login from './components/Login/Login';
import Aux from './hoc/Auxiliary';
import LanguageSelectionPopup from "./components/LanguageSelectionPopup/LanguageSelectionPopup";

import { connect } from 'react-redux';
import { history } from './LoginHelper/_helpers';
import { alertActions } from './TempPages/HomePage/_actions';
import { PrivateRoute } from './LoginHelper/_components';
import {HomePage} from './TempPages/HomePage';
import {LoginPage} from './TempPages/LoginPage';
import {RegisterPage} from './TempPages/RegisterPage';


class App extends Component {

//   constructor(props) {
//     super(props);

//     const { dispatch } = this.props;
//     history.listen((location, action) => {
//          // clear alert on location change
//         dispatch(alertActions.clear());
//     });
// }
  
  render() {
    return (
      <Aux>
        <Header />
        <main>
           <Sidebar /> 
          <Switch >
           
            <PrivateRoute exact path="/" component={PerformancesPage} />
            <Route path="/login" component={Login} />
            <Route path="/performance" component={PerformancesPage} />
            <Route path="/event"
                   render={() => <h1 style={{textAlign: 'center'}}>This section in development mode!</h1>}/>
            <Route exact path="/stream/:number" component={Stream} />
            {/* <Route path="/login" component={LoginPage} /> */}
            <Route path="/register" component={RegisterPage} />
            <Route path="/manage" component={HomePage} />

          </Switch>
        </main>
      </Aux>
    );
  }
}

// function mapStateToProps(state) {
//     const { alert } = state;
//     return {
//         alert
//     };
// }

// const connectedApp = connect(mapStateToProps)(App);
export default App ; 
