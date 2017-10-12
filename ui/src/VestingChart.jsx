import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment'

class VestingChart extends Component {
  render() {
    let { start, cliff, end, total, vested } = this.props.details
    let now = new Date / 1000

    let options = {
      legend: { display: false },
      scales: {
        xAxes: [ {
          type: "time",
          time: {
            format: 'MM/DD/YYYY',
            // round: 'day'
            tooltipFormat: 'll HH:mm'
          },
          scaleLabel: {
            display: true,
            labelString: 'Date'
          }
        }, ],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Amount'
          }
        }]
      },
    }

    let data = {
      datasets: [
        this.fromBaseDataset({
          data: [
            { x: this.formatDate(start), y: 0 },
            { x: this.formatDate(cliff), y: this.foo(total, start, cliff, end) },
            { x: this.formatDate(now), y: vested },
            { x: this.formatDate(end), y: total },
          ],
        }),
      ],
    }

    return <div>
      <h4>Vesting schedule</h4>
      <Line data={ data } options={ options } />
    </div>
  }

  foo(total, start, cliff, end) {
    let cli = cliff - start
    let en = end - start

    return total * cli / en
  }

  formatDate(date) {
    return moment(date * 1000).format('MM/DD/YYYY')
  }

  fromBaseDataset(opts) {
    let base = {
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: 'rgba(75,192,192,1)',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 5,
      pointHitRadius: 10,
    }

    return Object.assign(base, opts)
  }
}

export default VestingChart;