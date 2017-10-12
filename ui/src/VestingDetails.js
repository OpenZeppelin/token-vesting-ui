import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import moment from 'moment'

class VestingDetails extends Component {
  format(date) {
    let milliseconds = date * 1000
    return moment(milliseconds).format("dddd, MMMM Do YYYY, h:mm:ss a")
  }

  render() {
    let { start, end, cliff, total, released, releasable, vested, revocable } = this.props.details

    return <div>
      <h4>Vesting details</h4>
      <Table striped bordered condensed>
        <tbody>
          <tr>
            <th>Start date</th>
            <td>{ this.format(start) }</td>
          </tr>
          <tr>
            <th>Cliff</th>
            <td>{ this.format(cliff) }</td>
          </tr>
          <tr>
            <th>End date</th>
            <td>{ this.format(end) }</td>
          </tr>
          <tr>
            <th>Already vested</th>
            <td>{ vested }</td>
          </tr>
          <tr>
            <th>Already released</th>
            <td>{ released }</td>
          </tr>
          <tr>
            <th>Releasable</th>
            <td>{ releasable }</td>
          </tr>
          <tr>
            <th>Total</th>
            <td>{ total }</td>
          </tr>
          <tr>
            <th>Revocable</th>
            <td>{ revocable ? "✅" : "❌" }</td>
          </tr>
        </tbody>
      </Table>
    </div>
  }
}

export default VestingDetails