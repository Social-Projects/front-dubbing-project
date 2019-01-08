import React, { Component } from "react";
import "./PerformancesPage.css";
import PerformanceList from "./components/Performances/PerformanceList"
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import editPerformance from "./components/Performances/editPerformance";

class PerformancesPage extends Component {
  
  render() {
    return (
    <Switch>
      <Route exact path='/' render={() => (
  <Redirect to="/performance"/>
)}/>
      <Route exact path='/performance' component={PerformanceList}/>
      <Route path='/performance/:number' component={editPerformance}/>
    </Switch>
    );
  }
}

export default PerformancesPage; 
