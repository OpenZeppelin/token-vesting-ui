import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

import { TokenVesting, SimpleToken } from './contracts'

import Header from './Header'
import VestingDetails from './VestingDetails'
import VestingSchedule from './VestingSchedule'
import Spinner from './Spinner'

import './TokenVestingApp.css'


class TokenVestingApp extends Component {
  constructor() {
    super()
    this.state = { name: 'Token', loading: true }
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const { address, token } = this.props
    return (
      <div className="TokenVestingApp">

        { this.state.loading ? <Spinner /> : null }

        <Header address={ address } token={ token } tokenName={ this.state.name } />

        <Grid>
          <Row>
            <Col xs={12} md={6}>
              <VestingDetails
                address={ address }
                token={ token }
                details={ this.state }
                getData={ () => this.getData() }
                setLoader={ x => this.setLoader(x) }
              />
            </Col>

            <Col xs={12} md={6}>
              <VestingSchedule details={ this.state } />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }

  setLoader(loading) {
    this.setState({ loading })
  }

  async getData() {
    const { address, token } = this.props

    const tokenVesting = await TokenVesting.at(address)
    const tokenContract = await SimpleToken.at(token)

    const owner     = await tokenVesting.owner()
    const start     = await tokenVesting.start()
    const cliff     = await tokenVesting.cliff()
    const duration  = await tokenVesting.duration()
    const revocable = await tokenVesting.revocable()
    const revoked   = await tokenVesting.revoked(token)
    const vested    = await tokenVesting.vestedAmount(token)
    const released  = await tokenVesting.released(token)

    const balance = await tokenContract.balanceOf(address)
    const symbol  = await tokenContract.symbol()
    const name    = await tokenContract.name()

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
}


export default TokenVestingApp
