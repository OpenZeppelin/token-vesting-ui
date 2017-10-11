import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class VestingChart extends Component {
  render() {
    let { start, cliff, end } = this.props
    let now = 40

    let options = { legend: { display: false } }
    let data = {
      labels: ['Start', 'Cliff', 'Now', 'End'],
      datasets: [
        this.fromBaseDataset({
          fill: false,
          data: [start, cliff, now, end],
          borderDash: [5]
        }),
        this.fromBaseDataset({
          fill: true,
          data: [{ x: 'Start', y: start }, { x: 'Cliff', y: cliff }],
          backgroundColor: 'rgba(155, 155, 155, 0.7)'
        }),
        this.fromBaseDataset({
          fill: true,
          data: [{ x: 'Cliff', y: cliff }, { x: 'Now', y: now }]
        }),
      ],
    }

    return <div>
      <h4>Vesting schedule</h4>
      <Line data={ data } options={ options } />
    </div>
  }

  fromBaseDataset(opts) {
    let base = {
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: 'rgba(75,192,192,1)',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
    }

    return Object.assign(base, opts)
  }
}

export default VestingChart;