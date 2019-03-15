import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./components/Login/Login";
import PerformancesPage from "./components/Performances/PerformancesPage";
import Stream from "./components/Stream/Stream";
import Header from "./components/Toolbar/Header/Header";
import Sidebar from "./components/Toolbar/Sidebar/Sidebar";
import Aux from "./hoc/Auxiliary";

class App extends Component {
  public render(): JSX.Element {
      return (
        <Aux>
          <Header />
          <main>
            <Sidebar />
            <Switch>
              <Route path="/streamer/login" component={Login} />
              <Route exact path="/streamer/" component={PerformancesPage} />
              <Route path="/streamer/performance" component={PerformancesPage} />
              <Route exact path="/streamer/stream/:number" component={Stream} />
            </Switch>
          </main>
        </Aux>
      );
  }
}

export default App;
