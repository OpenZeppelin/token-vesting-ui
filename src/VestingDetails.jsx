import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import moment from 'moment'

import Emoji from './Emoji'
import Network from './network'
import { TokenVesting } from './contracts'


class VestingDetails extends Component {
  constructor() {
    super()
    this.state = { canRevoke: false }
  }

  async componentWillReceiveProps(nextProps) {
    const { owner, revoked } = nextProps.details
    const accounts = await Network.getAccounts()
    const isOwner = owner === accounts[0].toLowerCase()

    this.setState({ canRevoke: isOwner && ! revoked })
  }

  render() {
    const { start, cliff, end, total, released, releasable, vested, revocable } = this.props.details

    return <div className="details">
      <h4>Vesting details</h4>
      <Table striped bordered condensed>
        <tbody>
          <TableRow title="Start date">
            { this.formatDate(start) }
          </TableRow>
          
          <TableRow title="Clif">
            { this.formatDate(cliff) }
          </TableRow>
          
          <TableRow title="End date">
            { this.formatDate(end) }
          </TableRow>
          
          <TableRow title="Already vested">
            { this.formatTokens(vested) }
          </TableRow>
          
          <TableRow title="Already released">
            { this.formatTokens(released) }
          </TableRow>
          
          <TableRow title="Releasable">
            <Releasable releasable={ releasable } onRelease={ () => this.onRelease() }>
              { this.formatTokens(releasable) }
            </Releasable>
          </TableRow>
          
          <TableRow title="Total">
            { this.formatTokens(total) }
          </TableRow>

          <TableRow title="Revocable">
            <Revocable revocable={ revocable } canRevoke={ this.state.canRevoke } onRevoke={ () => this.onRevoke() } />
          </TableRow>
        </tbody>
      </Table>
    </div>
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

  startLoader() {
    this.props.setLoader(true)
  }

  stopLoader() {
    this.props.setLoader(false)
  }

  getTokenVesting() {
    return TokenVesting.at(this.props.address)
  }

  async onRelease() {
    const tokenVesting = this.getTokenVesting()
    const accounts = await Network.getAccounts()

    try {
      this.startLoader()
      await tokenVesting.release(this.props.token, { from: accounts[0] })
      this.props.getData()
    } catch (e) {
      this.setLoader()
    }
  }

  async onRevoke() {
    const tokenVesting = this.getTokenVesting()
    const accounts = await Network.getAccounts()

    try {
      this.startLoader()
      await tokenVesting.revoke(this.props.token, { from: accounts[0] })
      this.props.getData()
    } catch (e) {
      this.stopLoader()
    }
  }
}


function TableRow({ title, children }) {
  return (
    <tr>
      <th>{ title }</th>
      <td>
        { children }
      </td>
    </tr>
  )
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