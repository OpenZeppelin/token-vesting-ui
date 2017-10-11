import React, { Component } from 'react'
import VestingDetails from './VestingDetails'
import VestingChart from './VestingChart'

import { Grid, Row, Col } from 'react-bootstrap'
import './TokenVestingApp.css'

import Web3 from 'web3'
import contract from 'truffle-contract'
import vesting_artifacts from './TokenVesting.json'


class TokenVestingApp extends Component {
  contractLink(address) {
    let href = `https://etherscan.io/address/${address}`
    return <a href={ href } target="_blank">{ address }</a>
  }

  getTokenVesting(address) {
    let web3 = new Web3()
    let TokenVesting = contract(vesting_artifacts)
    TokenVesting.setProvider(web3.givenProvider)

    return TokenVesting.at(address)
  }

  async componentDidMount() {
    let { address } = this.props
    let tokenVesting = this.getTokenVesting(address)
    this.setState({ tokenVesting })

    let start = await tokenVesting.start()
    let cliff = await tokenVesting.cliff()
    let duration = await tokenVesting.duration()
    console.log(start, cliff, duration)
  }

  render() {
    let { address } = this.props

    let details = {
      start: new Date().toString(),
      end: 2,
      cliff: 3,
      total: 4,
      vested: 5,
      revocable: false
    }

    return (
      <div className="TokenVestingApp">
        <header className="header">
          <h3>Contract address: { this.contractLink(address) }</h3>
        </header>
        <Grid>
          <Row>
            <Col xs={6}>
              <VestingDetails details={ details } />
            </Col>
            <Col xs={6}>
              <VestingChart start={0} cliff={20} end={60} />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default TokenVestingApp
