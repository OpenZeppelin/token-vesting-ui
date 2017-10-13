import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import moment from 'moment'

class VestingDetails extends Component {
  format(date) {
    let milliseconds = date * 1000
    return moment(milliseconds).format("dddd, MMMM Do YYYY, h:mm:ss a")
  }

  releasable() {
    let { releasable, symbol } = this.props.details

    return releasable > 0
      ? <span>{releasable} {symbol} <a onClick={ this.props.onRelease }>release</a> </span>
      : `${releasable} ${symbol}`
  }

  revocable() {
    return this.props.details.revocable
      ? <span>✅ <a onClick={ this.props.onRevoke }>revoke</a> </span>
      : "❌"
  }

  render() {
    let { start, end, cliff, total, released, vested, symbol } = this.props.details

    return <div className="details">
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
            <td>{ vested } { symbol }</td>
          </tr>
          <tr>
            <th>Already released</th>
            <td>{ released } { symbol }</td>
          </tr>
          <tr>
            <th>Releasable</th>
            <td>{ this.releasable() }</td>
          </tr>
          <tr>
            <th>Total</th>
            <td>{ total } { symbol }</td>
          </tr>
          <tr>
            <th>Revocable</th>
            <td>{ this.revocable() }</td>
          </tr>
        </tbody>
      </Table>
    </div>
  }
}

export default VestingDetails