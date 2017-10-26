# Token Vesting Dapp

Web-based GUI to interact with the [Token Vesting contract](https://github.com/OpenZeppelin/zeppelin-solidity/blob/master/contracts/token/TokenVesting.sol) provided by the [OpenZeppelin](https://openzeppelin.org) [library](https://github.com/OpenZeppelin/zeppelin-solidity).

![Token Vesting Dapp](https://github.com/OpenZeppelin/token-vesting-ui/blob/master/example.png)

## Usage

### 1. Clone the repo
```
git clone git@github.com:OpenZeppelin/token-vesting-ui.git
```

### 2. Install the dependencies
```
npm install
```

Also make sure you have [Metamask](https://metamask.io/) installed and youhave your account unlocked.

### 3. Build the contracts with truffle
```
npm i -g truffle
truffle compile
```

### 4. Start the web server
```
npm start
```

### 5. Ready!
Go to `http://localhost:3000/<token-vesting-address>/<erc20-token-address>` and interact with the contract!

### 6. (optional) Deploy your own vesting contract
If you don't have a vesting contract to try this out, deploy your own easily:

```
# Clone OpenZeppelin repo
git clone git@github.com:OpenZeppelin/zeppelin-solidity.git
cd zeppelin-solidity

# Compile OpenZeppelin's contracts
truffle compile

# Connect to your node (check truffle-config.js to make sure you're connecting to the right host:port)
truffle console --network=development

# Deploy a new ERC20 token (or use your own)


```
