import React, { Component } from 'react';
import './App.css';
import MultiChart from './components/MultiChart'
import Chart from './components/Chart'
import axios from 'axios';
import PropTypes from 'prop-types';

const site = [], num_sta = [], wlan_bytes = [], time = []

class App extends Component {
  constructor() {
    super();
    this.state = {
      chartData: {},
      time: '',
      num_sta: '',
      wlan_bytes: '',
      site: ''
    }
  }

  render() {
    // const { classes } = this.props;
    return (
      <div className="App">
        <Chart
          chartData={this.state.chartData}
          legendPosition='bottom'
        />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default App;