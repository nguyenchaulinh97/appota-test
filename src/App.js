import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chart from './components/Chart';
import axios from 'axios';
import ReactLoading from 'react-loading';

class App extends Component {
  constructor() {
    super();
    this.state = {
      chartData: null,
      data: [],
      totalData: [],
    }
    this.getChartData = this.getChartData.bind(this)
  }

  componentWillMount = () => {
    this.getChartData();
  }

  getChartData() {
    var site = [], num_sta = [], wlan_bytes = [], time = []
    axios.get('https://dev.cong.appwifi.com/stat/client')
      .then(res => {
        if (res.status == '200') {
          if (res.data.message == 'success') {
            const data = res.data.data
            // this.setState({data: res.data.data})
            data.forEach(e => {
              time.push(new Date(e.time).toLocaleString())
              num_sta.push(e.num_sta)
              wlan_bytes.push(e.wlan_bytes)
              site.push(e.site)
            });
          }
          else {

          }

        }
        else {

        }
      }).catch(function (error) {
        console.log(error);
      });
    this.setState({
      chartData: {
        labels: time,
        datasets: [
          {
            label: 'Số lượng',
            type: 'bar',
            data: num_sta,
            backgroundColor: [
              'rgba(54, 162, 235, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(54, 162, 235, 0.6)'
            ]
          },
          {
            label: 'Dung lượng',
            type: 'line',
            data: wlan_bytes,
            pointBackgroundColor: 'black',
            borderColor: 'black',
            fill: false,
          }
        ]
      }
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.chartData ? 
          <Chart
            chartData={this.state.chartData}
            name="NGUYEN CHAU LINH"
            legendPosition="bottom"
          /> : <ReactLoading />
        }
        <ReactLoading />
      </div>
    );
  }
}

export default App;