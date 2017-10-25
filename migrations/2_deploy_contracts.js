const TokenVesting = artifacts.require("TokenVesting")
const SimpleToken = artifacts.require("SimpleToken")

module.exports = function(deployer) {
  const beneficiary = "0x1E6876a6C2757de611c9F12B23211dBaBd1C9028"

  const start = 151088760 // 10/04/2016
  const cliff = 30 // ~1 yr
  const duration = 60 * 60 // ~4yrs

  deployer.deploy(TokenVesting, beneficiary, start, cliff, duration, false)
  deployer.deploy(SimpleToken)
};
