import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import moment from 'moment'

import { getTokenVesting } from '../contracts'
import { displayAmount } from '../utils'
import Network from '../network'

import { ContractLink } from './Links'
import Emoji from './Emoji'


class VestingDetails extends Component {
  constructor() {
    super()
    this.state = { canRevoke: false }
  }

  async componentWillReceiveProps(nextProps) {
    const { owner, revoked } = nextProps.details
    const accounts = await Network.getAccounts()

    const isOwner = accounts[0]
      ? owner === accounts[0].toLowerCase()
      : undefined

    this.setState({ accounts, canRevoke: isOwner && ! revoked })
  }

  render() {
    const { start, cliff, end, total, released, vested, revocable, beneficiary } = this.props.details
    const releasable = vested ? vested - released : null

    return <div className="details">
      <h4>Vesting details</h4>
      <Table striped bordered condensed>
        <tbody>
          <TableRow title="Beneficiary">
            <ContractLink address={ beneficiary } />
          </TableRow>

          <TableRow title="Start date">
            { this.formatDate(start) }
          </TableRow>
          
          <TableRow title="Cliff">
            { this.formatDate(cliff) }
          </TableRow>
          
          <TableRow title="End date">
            { this.formatDate(end) }
          </TableRow>
          
          <TableRow title="Total vesting">
            { this.formatTokens(total) }
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
    if (amount == null) return
    const { decimals, symbol } = this.props.details
    const display = displayAmount(amount, decimals)

    return `${display} ${symbol}`
  }

  startLoader() {
    this.props.setLoader(true)
  }

  stopLoader() {
    this.props.setLoader(false)
  }

  async getTokenVesting() {
    return getTokenVesting(this.props.address)
  }

  async onRelease() {
    const { token } = this.props
    const { accounts } = this.state
    const tokenVesting = await this.getTokenVesting()

    try {
      this.startLoader()
      await tokenVesting.release(token, { from: accounts[0] })
      this.props.getData()
    } catch (e) {
      this.stopLoader()
    }
  }

  async onRevoke() {
    const { token } = this.props
    const { accounts } = this.state
    const tokenVesting = await this.getTokenVesting()

    try {
      this.startLoader()
      await tokenVesting.revoke(token, { from: accounts[0] })
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