import React, { Component } from "react";
import "./App.css";
import PerformanceList from "./components/Performances/PerformanceList"
class PerformancesPage extends Component {
  render() {
    return (
      <div className="App">
        <PerformanceList />
      </div>
    );
  }
}

export default PerformancesPage;
