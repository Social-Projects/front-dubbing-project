import React, { Component } from "react";
import PerformanceList from "./PerformanceList/PerformanceList"

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import EditPerformance from "./EditPerformance/EditPerformance";

class PerformancesPage extends Component {
  
  render() {
    return (
      <Switch>
        <Route exact path='/' render={() => (
          <Redirect to="/performance" />
        )} />
        <Route exact path='/performance' component={PerformanceList} />
        <Route path='/performance/:number' component={EditPerformance} />
      </Switch>
    );
  }
}

export default PerformancesPage; 
