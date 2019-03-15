import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import EditPerformance from "./EditPerformance/EditPerformance";
import PerformanceList from "./PerformanceList/PerformanceList";

class PerformancesPage extends Component {

  public render() {
    return (
      <Switch>
        <Route exact path="/" render={() => (
          <Redirect to="/streamer/performance" />
        )} />
        <Route exact path="/streamer/performance" component={PerformanceList} />
        <Route path="/streamer/performance/:number" component={EditPerformance} />
      </Switch>
    );
  }
}

export default PerformancesPage;
