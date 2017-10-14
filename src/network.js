import Web3 from 'web3'

const Network = {
  web3() {
    return new Web3(this.provider())
  },

  eth() {
    return this.web3().eth
  },

  provider() {
    let { web3 } = window
    if (typeof web3 !== 'undefined') return web3.currentProvider
    return new Web3.providers.HttpProvider("http://localhost:8545")
  },

  getCode(address) {
    return new Promise(function (resolve, reject) {
      Network.eth().getCode(address, Network._web3Callback(resolve, reject))
    })
  },

  getAccounts() {
    return new Promise(function (resolve, reject) {
      Network.eth().getAccounts(Network._web3Callback(resolve, reject))
    })
  },

  getBalance(address) {
    return new Promise(function (resolve, reject) {
      Network.eth().getBalance(address, Network._web3Callback(resolve, reject))
    })
  },

  getTransaction(txHash) {
    return new Promise(function (resolve, reject) {
      Network.eth().getTransaction(txHash, Network._web3Callback(resolve, reject))
    })
  },

  _web3Callback(resolve, reject) {
    return function (error, value) {
      if (error) reject(error);
      else resolve(value);
    }
  }
}

export default Network