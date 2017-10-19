import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import moment from 'moment'

import { displayAmount } from '../utils'

class VestingChart extends Component {
  render() {
    return <Line data={ this.chartData() } options={ this.chartOptions() } />
  }

  chartData() {
    const { start, cliff, end, total, vested, decimals } = this.props.details
    const now = new Date() / 1000 // normalize to seconds

    return {
      datasets: [
        this.fromBaseDataset({
          data: [
            { x: this.formatDate(start), y: 0 },
            { x: this.formatDate(cliff), y: this.getCliffAmount() },
            { x: this.formatDate(now), y: displayAmount(vested, decimals) },
            { x: this.formatDate(end), y: displayAmount(total, decimals) },
          ],
        }),
      ],
    }
  }

  getCliffAmount() {
    const { total, start, cliff, end, decimals } = this.props.details
    const slope = (cliff - start) / (end - start)

    return displayAmount(total, decimals) * slope
  }

  formatDate(date) {
    return moment(date * 1000).format('MM/DD/YYYY HH:mm')
  }

  chartOptions() {
    return {
      legend: { display: false },
      scales: {
        xAxes: [ {
          type: "time",
          time: {
            format: 'MM/DD/YYYY HH:mm',
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
            labelString: this.props.details.symbol || ''
          }
        }]
      },
    }
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
}

export default VestingChart