import React, { Component } from 'react'
import VestingDetails from './VestingDetails'
import VestingChart from './VestingChart'
import Emoji from './Emoji'
import Spinner from './Spinner'

import { Grid, Row, Col } from 'react-bootstrap'
import './TokenVestingApp.css'

import Network from './network'
import { TokenVesting, SimpleToken } from './contracts'


class TokenVestingApp extends Component {
  constructor() {
    super()
    this.state = { name: 'Token', loading: true }
  }

  getTokenVesting() {
    return TokenVesting.at(this.props.address)
  }

  getTokenContract() {
    return SimpleToken.at(this.props.token)
  }

  async getData() {
    const { address, token } = this.props

    const tokenVesting = await this.getTokenVesting()
    const tokenContract = await this.getTokenContract()

    if (! tokenVesting || ! tokenContract) {
      // TODO reconnection strategy
      console.error("Could not connect to blockchain")
      return
    }

    const start = await tokenVesting.start()
    const cliff = await tokenVesting.cliff()
    const duration = await tokenVesting.duration()
    const revocable = await tokenVesting.revocable()
    const revoked = await tokenVesting.revoked(token)
    const vested = await tokenVesting.vestedAmount(token)
    const released = await tokenVesting.released(token)
    const balance = await tokenContract.balanceOf(address)

    const symbol = await tokenContract.symbol()
    const name = await tokenContract.name()

    const owner = await tokenVesting.owner()

    const total = balance.plus(released)
    const end = start.plus(duration)

    this.setState({
      // TODO transform values properly
      start: +start.toString(),
      end: +end.toString(),
      cliff: +cliff.toString(),
      total: +total.toString(),
      released: +released.toString(),
      vested: +vested.toString(),
      releasable: +vested.minus(released).toString(),
      owner,
      revocable,
      revoked,
      name,
      symbol,
      loading: false
    })
  }

  componentDidMount() {
    this.getData()
  }

  contractLink() {
    const { address } = this.props
    const href = `https://etherscan.io/address/${address}`
    return <a href={ href } target="_blank">{ address }</a>
  }

  tokenLink() {
    const href = `https://etherscan.io/token/${this.props.token}`
    return <a href={ href } target="_blank">{ this.state.name }</a>
  }

  async onRelease() {
    const accounts = await Network.getAccounts()
    const tokenVesting = this.getTokenVesting()

    this.toggleLoader()

    try {
      const res = await tokenVesting.release(this.props.token, { from: accounts[0] })
      this.getData()
    } catch (e) {
      this.toggleLoader()
    }
  }

  async onRevoke() {
    const accounts = await Network.getAccounts()
    const tokenVesting = this.getTokenVesting()

    this.toggleLoader()

    try {
      const res = await tokenVesting.revoke(this.props.token, { from: accounts[0] })
      this.getData()
    } catch (e) {
      this.toggleLoader()
    }
  }

  toggleLoader() {
    this.setState({ loading: ! this.state.loading })
  }

  render() {
    return (
      <div className="TokenVestingApp">
        { this.state.loading ? <Spinner /> : null }

        <header className="header">
          <Grid>
            <Col xs={12}>
              <a target="_blank" href="https://openzeppelin.org" rel="noopener noreferrer">
                <img className="logo hidden-xs hidden-sm" src="/logo-zeppelin.png" alt="OpenZeppelin logo" />
              </a>
              <div className="contracts">
                <h3>Vesting address: { this.contractLink() }</h3>
                <span>For { this.tokenLink() } token</span>
              </div>
            </Col>
          </Grid>
        </header>
        <Grid>
          <Row>
            <Col xs={12} md={6}>
              <VestingDetails onRevoke={ () => this.onRevoke() } onRelease={ () => this.onRelease() } details={ this.state } />
            </Col>
            <Col xs={12} md={6}>
              <h4>Vesting schedule</h4>
              { ! this.state.revoked
                  ? <VestingChart details={ this.state } />
                  : <Revoked />
              }
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}


function Revoked() {
  return <div className="revoked">
    <span className="revoked-message">
      <Emoji e="⚠️" /> Revoked
    </span>
    <VestingChart details={ {} } />
  </div>
}

export default TokenVestingApp
