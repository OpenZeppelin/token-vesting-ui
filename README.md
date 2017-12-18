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

Also make sure you have [Metamask](https://metamask.io/) installed, pointing to the right network and your account is unlocked.

### 3. Build the contracts with truffle
```
npx truffle compile
```
> Note: the `npx` command [comes with npm](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) as of npm@5.2.0 version.

### 4. Start the web server
```
npm start
```

### 5. (optional) Deploy your own vesting contract
If you don't have a vesting contract to try this out, deploy your own easily:

#### i. Make sure you are connected to an ethereum node. You can use [testrpc](https://github.com/ethereumjs/testrpc) to simulate one:
```
npx testrpc
```

#### ii. Deploy the contracts:
```
npx truffle migrate
```

You should get a `TokenVesting` and a `SimpleToken` address:
```
Compiling ./contracts/MyVesting.sol...
Compiling zeppelin-solidity/contracts/examples/SimpleToken.sol...
Compiling zeppelin-solidity/contracts/math/Math.sol...
Compiling zeppelin-solidity/contracts/math/SafeMath.sol...
Compiling zeppelin-solidity/contracts/ownership/Ownable.sol...
Compiling zeppelin-solidity/contracts/token/BasicToken.sol...
Compiling zeppelin-solidity/contracts/token/ERC20.sol...
Compiling zeppelin-solidity/contracts/token/ERC20Basic.sol...
Compiling zeppelin-solidity/contracts/token/SafeERC20.sol...
Compiling zeppelin-solidity/contracts/token/StandardToken.sol...
Compiling zeppelin-solidity/contracts/token/TokenVesting.sol...
Writing artifacts to ./build/contracts

Using network 'development'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0x238905c90b586a1e29a510aee9312ec3dbf1276723510191604cdf32837cb755
  Migrations: 0xd9d268db0a1926847b50f4256be8d9f4ea2140e2
Saving successful migration to network...
  ... 0x51161a48ec8d18857ff1abecca4b67c56e5243a4258a3e640f7701bd43bfb7cb
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Deploying TokenVesting...
  ... 0x100a31e8a48e357ea26b3720c573a56e2bb37a86fbba5953c88206f68f00c590
  TokenVesting: 0x5c95714bb1e0f0b41548d1437f1fcb07ea1c23f8
  Deploying SimpleToken...
  ... 0xe75b5355147e1fe252801d391da3d14368b6343b8313ba4838e4c62330a72184
  SimpleToken: 0x4500ab575934d13be4a75023508ac602a001d409
Saving successful migration to network...
  ... 0x79289cc9b1c8053e7cc9f218bd6edffae057768d85a0a10ad9159334b678fdd6
Saving artifacts...

```

These are our addresses:
```
TokenVesting: 0x5c95714bb1e0f0b41548d1437f1fcb07ea1c23f8
SimpleToken: 0x4500ab575934d13be4a75023508ac602a001d409
```

### 6. Ready!
Go to `http://localhost:3000/<token-vesting-address>/<erc20-token-address>` and interact with the contract!
