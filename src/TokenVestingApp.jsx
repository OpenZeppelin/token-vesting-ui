import React, { Component } from 'react'
import VestingDetails from './VestingDetails'
import VestingChart from './VestingChart'

import { Grid, Row, Col } from 'react-bootstrap'
import './TokenVestingApp.css'

// TODO abstract contract layer
import Web3 from 'web3'
import contract from 'truffle-contract'
import vesting_artifacts from './TokenVesting.json'
import token_artifacts from './SimpleToken.json'


class TokenVestingApp extends Component {
  constructor() {
    super()
    this.state = this.initialState()
  }

  initialState() {
    return {
      web3: this.getWeb3(),
      start: new Date() / 1000 - 1000000,
      cliff: new Date() / 1000 - 300000,
      end: new Date() / 1000 + 1000000,
      vested: null,
      total: null,
      revocable: false,
      name: 'Token',
      symbol: '---'
    }
  }

  getTokenVesting(address) {
    let { currentProvider } = this.state.web3
    if (! currentProvider) return

    let TokenVesting = contract(vesting_artifacts)
    TokenVesting.setProvider(currentProvider)

    return TokenVesting.at(address)
  }

  getTokenContract(address) {
    let { currentProvider } = this.state.web3
    if (! currentProvider) return

    let Token = contract(token_artifacts)
    Token.setProvider(currentProvider)

    return Token.at(address)
  }

  async componentDidMount() {
    let { address, token } = this.props

    let tokenVesting = this.getTokenVesting(address)
    let tokenContract = this.getTokenContract(token)

    if (! tokenVesting || ! tokenContract) {
      // TODO reconnection strategy
      console.error("Could not connect to blockchain")
      return
    }

    let start = await tokenVesting.start()
    let cliff = await tokenVesting.cliff()
    let duration = await tokenVesting.duration()
    let revocable = await tokenVesting.revocable()
    let revoked = await tokenVesting.revoked(token)
    let vested = await tokenVesting.vestedAmount(token)
    let released = await tokenVesting.released(token)
    let balance = await tokenContract.balanceOf(address)

    let symbol = await tokenContract.symbol()
    let name = await tokenContract.name()

    let owner = await tokenVesting.owner()
    console.log(owner)

    let total = balance.plus(released)
    let end = start.plus(duration)

    this.setState({
      // TODO transform values properly
      start: +start.toString(),
      end: +end.toString(),
      cliff: +cliff.toString(),
      total: +total.toString(),
      released: +released.toString(),
      vested: +vested.toString(),
      releasable: +vested.minus(released).toString(),
      revocable,
      revoked,
      name,
      symbol
    })
  }

  getWeb3() {
    if (typeof window.web3 === 'undefined') {
      return {}
    } else {
      let myWeb3 = new Web3(window.web3.currentProvider)
      myWeb3.eth.defaultAccount = window.web3.eth.defaultAccount

      return myWeb3
    }
  }

  contractLink() {
    let { address } = this.props
    let href = `https://etherscan.io/address/${address}`
    return <a href={ href } target="_blank">{ address }</a>
  }

  tokenLink() {
    let href = `https://etherscan.io/token/${this.props.token}`
    return <a href={ href } target="_blank">{ this.state.name }</a>
  }

  async onRelease() {
    let { address, token } = this.props
    let from = await this.getAccount()

    let tokenVesting = this.getTokenVesting(address)
    await tokenVesting.release(token, { from })
    console.log("Release!")

    window.location.reload()
  }

  async onRevoke() {
    let { address, token } = this.props
    let from = await this.getAccount()

    let tokenVesting = this.getTokenVesting(address)
    console.log("Revoke!")
    await tokenVesting.revoke(token, { from })

    window.location.reload()
  }

  async getAccount() {
    let accounts = await this.state.web3.eth.getAccounts()
    return accounts[0]
  }

  render() {
    return (
      <div className="TokenVestingApp">
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
              <VestingDetails onRevoke={ () => this.onRevoke() } onRelease={ () => this.onRevoke() } details={ this.state } />
            </Col>
            <Col xs={12} md={6}>
              { ! this.state.revoked
                  ? <VestingChart details={ this.state } />
                  : "Revoked"
              }
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default TokenVestingApp
