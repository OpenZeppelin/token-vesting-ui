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
    this.state = {
      web3: new Web3(),
      start: new Date() / 1000 - 1000000,
      cliff: new Date() / 1000 - 300000,
      end: new Date() / 1000 + 1000000,
      vested: 5,
      total: 10,
      revocable: false
    }
  }

  contractLink(address) {
    let href = `https://etherscan.io/address/${address}`
    return <a href={ href } target="_blank">{ address }</a>
  }

  getTokenVesting(address) {
    let { givenProvider } = this.state.web3
    if (! givenProvider) return

    let TokenVesting = contract(vesting_artifacts)
    TokenVesting.setProvider(givenProvider)

    return TokenVesting.at(address)
  }

  getTokenContract(address) {
    let { givenProvider } = this.state.web3
    if (! givenProvider) return

    let Token = contract(token_artifacts)
    Token.setProvider(givenProvider)

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
    let vested = await tokenVesting.vestedAmount(token)
    let released = await tokenVesting.released(token)
    let balance = await tokenContract.balanceOf(address)

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
      revocable: revocable
    })
  }

  render() {
    let { address } = this.props
    let details = this.state

    return (
      <div className="TokenVestingApp">
        <header className="header">
          <h3>Contract address: { this.contractLink(address) }</h3>
        </header>
        <Grid>
          <Row>
            <Col xs={12} md={6}>
              <VestingDetails details={ details } />
            </Col>
            <Col xs={12} md={6}>
              <VestingChart details={ details } />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default TokenVestingApp
