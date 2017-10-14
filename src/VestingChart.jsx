import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import moment from 'moment'

class VestingChart extends Component {
  render() {
    return <Line data={ this.chartData() } options={ this.chartOptions() } />
  }

  chartData() {
    const { start, cliff, end, total, vested } = this.props.details
    const now = new Date() / 1000 // normalize to seconds

    return {
      datasets: [
        this.fromBaseDataset({
          data: [
            { x: this.formatDate(start), y: 0 },
            { x: this.formatDate(cliff), y: this.getCliffAmount() },
            { x: this.formatDate(now), y: vested },
            { x: this.formatDate(end), y: total },
          ],
        }),
      ],
    }
  }

  chartOptions() {
    return {
      legend: { display: false },
      scales: {
        xAxes: [ {
          type: "time",
          time: {
            format: 'MM/DD/YYYY',
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
            labelString: this.props.details.symbol
          }
        }]
      },
    }
  }

  getCliffAmount() {
    const { total, start, cliff, end } = this.props.details
    const slope = (cliff - start) / (end - start)

    return total * slope
  }

  fromBaseDataset(opts) {
    return {
      lineTension: 0.1,
      backgroundColor: 'rgba(92,182,228,0.4)',
      borderColor: 'rgba(92,182,228,1)',
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(92,182,228,1)',
      pointBackgroundColor: 'rgba(92,182,228,1)',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(92,182,228,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 5,
      pointHitRadius: 10,
      ...opts
    }
  }

  formatDate(date) {
    return moment(date * 1000).format('MM/DD/YYYY')
  }
}

export default VestingChart