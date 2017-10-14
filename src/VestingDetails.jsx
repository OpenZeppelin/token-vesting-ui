import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import moment from 'moment'
import Emoji from './Emoji'
import Network from './network'

class VestingDetails extends Component {
  constructor() {
    super()
    this.state = { canRevoke: false }
  }

  async componentDidMount() {
    const { owner, revoked } = this.props.details
    const accounts = await Network.getAccounts()
    const isOwner = owner === accounts[0]

    this.setState({ canRevoke: isOwner && ! revoked })
  }

  formatDate(date) {
    if (! date) return
    const milliseconds = date * 1000
    return moment(milliseconds).format("dddd, MMMM Do YYYY, h:mm:ss a")
  }

  formatTokens(amount) {
    if (amount === undefined) return
    return `${amount} ${this.props.details.symbol}`
  }

  render() {
    const { start, cliff, end, total, released, releasable, vested, revocable } = this.props.details
    const { onRevoke, onRelease } = this.props
    const { canRevoke } = this.state

    return <div className="details">
      <h4>Vesting details</h4>
      <Table striped bordered condensed>
        <tbody>
          <tr>
            <th>Start date</th>
            <td>{ this.formatDate(start) }</td>
          </tr>
          <tr>
            <th>Cliff</th>
            <td>{ this.formatDate(cliff) }</td>
          </tr>
          <tr>
            <th>End date</th>
            <td>{ this.formatDate(end) }</td>
          </tr>
          <tr>
            <th>Already vested</th>
            <td>{ this.formatTokens(vested) }</td>
          </tr>
          <tr>
            <th>Already released</th>
            <td>{ this.formatTokens(released) }</td>
          </tr>
          <tr>
            <th>Releasable</th>
            <td>
              <Releasable releasable={ releasable } onRelease={ onRelease }>
                { this.formatTokens(releasable) }
              </Releasable>
            </td>
          </tr>
          <tr>
            <th>Total</th>
            <td>{ this.formatTokens(total) }</td>
          </tr>
          <tr>
            <th>Revocable</th>
            <td>
              <Revocable revocable={ revocable } canRevoke={ canRevoke } onRevoke={ onRevoke } />
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  }
}

function Revocable({ revocable, onRevoke, canRevoke }) {
  if (! revocable) return <Emoji e="❌" />

  return <span>
    <Emoji e="✅" />
    { canRevoke ? <a className="action" onClick={ onRevoke }>revoke</a> : null }
  </span>
}


function Releasable({ releasable, onRelease, children }) {
  return <span>
    { children }
    { releasable > 0 ? <a className="action" onClick={ onRelease }>release</a> : null }
  </span>
}

export default VestingDetails