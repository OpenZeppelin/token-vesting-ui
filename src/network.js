import Web3 from 'web3'
import { sleep } from './utils'

const Network = {
  web3() {
    return new Promise((resolve, reject) => {
      Network.provider().then(provider => resolve(new Web3(provider)))
    })
  },

  eth() {
    return new Promise((resolve, reject) => {
      Network.web3().then(web3 => resolve(web3.eth))
    })
  },

  async provider() {
    let { web3 } = window

    while (web3 === undefined) {
      Network._log("Waiting for web3")
      await sleep(1000)
      web3 = window.web3
    }

    return web3.currentProvider
  },

  getAccounts() {
    return new Promise((resolve, reject) => {
      Network.eth().then(eth => eth.getAccounts(Network._web3Callback(resolve, reject)))
    })
  },

  _web3Callback(resolve, reject) {
    return (error, value) => {
      if (error) reject(error)
      else resolve(value)
    }
  },

  _log(msg) {
    console.log(`[Network] ${msg}`)
  }
}

export default Network