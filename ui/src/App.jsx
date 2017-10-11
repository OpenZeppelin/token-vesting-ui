import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TokenVestingApp from './TokenVestingApp'
import Web3 from 'web3'

const App = () => (
  <Router>
    <Switch>
      <Route path="/:address" component={ Main }/>
      <Route component={ MissingAddress } />
    </Switch>
  </Router>
)

const Main = function({ match }) {
  let web3 = new Web3()
  let { address } = match.params

  return web3.isAddress(address)
    ? <TokenVestingApp address={ address } />
    : <MissingAddress />
}

const MissingAddress = () => (
  <p>This is not a TokenVesting address :(</p>
)

export default App