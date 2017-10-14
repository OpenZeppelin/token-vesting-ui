import contract from 'truffle-contract'
import Network from "./network"

const provider = Network.provider()

const TokenVesting = contract(require('./contracts/TokenVesting.json'))
TokenVesting.setProvider(provider)

const SimpleToken = contract(require('./contracts/SimpleToken.json'))
SimpleToken.setProvider(provider)

export {
  TokenVesting,
  SimpleToken
}