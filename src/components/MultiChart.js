import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class MultiChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData
    }
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'right',
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
              fontSize: 25
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
      </div>
    )
  }
}

export default MultiChart;
