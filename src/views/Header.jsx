import React from 'react'
import { Grid, Col } from 'react-bootstrap'
import { ContractLink, TokenLink } from './Links'

function Header({ address, token, tokenName }) {
  return ( 
    <header className="header">
      <Grid>
        <Col xs={12}>
          <a target="_blank" href="https://openzeppelin.org" rel="noopener noreferrer">
            <img className="logo hidden-xs hidden-sm" src="/logo-zeppelin.png" alt="OpenZeppelin logo" />
          </a>
          <div className="contracts">
            <h3>Vesting address: <ContractLink address={ address } /></h3>
            <span>For <TokenLink address={ token } name={ tokenName } /> token</span>
          </div>
        </Col>
      </Grid>
    </header>
  )
}

export default Header