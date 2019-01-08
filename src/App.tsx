import React, { Component } from 'react';
import './index.css';
import PerformancesPage from './PerformancesPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


class App extends Component{
render(){
    return(
        <Router>
        <Switch>
                <Route exact path="/" component={PerformancesPage} />
                <Route path="/performance" component={PerformancesPage} />
        </Switch>

</Router>
    )
}
}
export default App;