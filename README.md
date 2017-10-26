# Token Vesting Dapp

Web-based GUI to interact with the [Token Vesting contract](https://github.com/OpenZeppelin/zeppelin-solidity/blob/master/contracts/token/TokenVesting.sol) provided by the [OpenZeppelin](https://openzeppelin.com) [library](https://github.com/OpenZeppelin/zeppelin-solidity).

![Token Vesting Dapp](https://github.com/OpenZeppelin/token-vesting-ui/blob/master/example.png)

## Usage

### 1. Install the dependencies
```
npm install
```

Also make sure you've got [Metamask](https://metamask.io/) installed and you're logged into it.

### 2. Build the contracts
```
truffle compile
```

### 3. Start the web server
```
npm start
```

### 4. Ready!
Go to `http://localhost:3000/<token-vesting-address>/<erc20-token-address>` and interact with the contract!
