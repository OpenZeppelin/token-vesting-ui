import Web3 from 'web3'
import { sleep } from './utils'

const Network = {
  async web3() {
    const provider = await Network.provider()
    return new Web3(provider)
  },

  async eth() {
    const web3 = await Network.web3()
    return web3.eth
  },

  async provider() {
      // Modern dapp browsers...
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
          return window.web3.currentProvider

        } catch (error) {
          // User denied account access...
          console.log('User denied account access...!');
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        // Acccounts always exposed
        return window.web3.currentProvider
      }
      // Non-dapp browsers...
      else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
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

  log(msg) {
    console.log(`[Network] ${msg}`)
  }
}

export default Network