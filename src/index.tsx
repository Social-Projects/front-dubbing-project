import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PerformancesPage from './PerformancesPage';
import editPerformance from './components/Performances/editPerformance';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

ReactDOM.render(
<Router>
        <Switch>
                <Route exact path="/" component={PerformancesPage} />
                <Route path="/performance" component={PerformancesPage} />
        </Switch>

</Router>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
