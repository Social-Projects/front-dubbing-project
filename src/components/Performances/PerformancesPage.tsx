import React, { Component } from "react";
import PerformanceList from "./PerformanceList"
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import editPerformance from "./editPerformance";

class PerformancesPage extends Component {
  
  render() {
    return (
      <Switch>
        <Route exact path='/' render={() => (
          <Redirect to="/performance" />
        )} />
        <Route exact path='/performance' component={PerformanceList} />
        <Route path='/performance/:number' component={editPerformance} />
      </Switch>
    );
  }
}

export default PerformancesPage; 
