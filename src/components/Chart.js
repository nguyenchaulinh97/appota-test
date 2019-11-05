import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
      tableData: null
    }
    this.getChartData = this.getChartData.bind(this)
  }

  componentDidMount() {
    this.getChartData();
  }

  getChartData() {
    var site = [], num_sta = [], wlan_bytes = [], time = []
    axios.get('https://dev.cong.appwifi.com/stat/client')
      .then(res => {
        if (res.status == '200') {
          if (res.data.message == 'success') {
            const data = res.data.data
            this.setState({ tableData: data })
            console.log(this.state.tableData)
            data.forEach(e => {
              time.push(new Date(e.time).toLocaleString())
              num_sta.push(e.num_sta)
              wlan_bytes.push(e.wlan_bytes)
              site.push(e.site)
            });
          }
          else { }
        }
        else { }
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
    })
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'bottom',
  }

  render() {
    return (
      <div className="chart">
        <Bar
          data={this.state.chartData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: 'TEST 1',
              fontSize: 25,
              color: 'black'
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition,
            },
            layout: {
              padding: {
                top: 50,
                right: 150,
                left: 150
              }
            },
            responsive: true,
            responsiveAnimationDuration: 600,
          }}
        />
        <br />
        <h1 style={{ color: 'gray', fontSize: 25 }}>TEST 2</h1>
        <div style={{ width: 500, height: 300, margin: '0 auto', border: '1px solid black' }}>
          <table>
            <tr>
              <th>STT</th>
              <th>Địa điểm</th>
              <th>Số lượng</th>
              <th>Dung lượng</th>
            </tr>
            {this.state.tableData ?
              <div>
                {this.state.tableData.map((r, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{r.site}</td>
                    <td>{r.num_sta}</td>
                    <td>{r.wlan_bytes}</td>
                  </tr>
                ))}
              </div>
              : <p>Empty Data</p>}
          </table>
        </div>
      </div>
    )
  }
}

export default Chart;
