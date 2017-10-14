const MyVesting = artifacts.require("TokenVesting");
const SimpleToken = artifacts.require("SimpleToken");

module.exports = function(deployer) {
  const beneficiary = "0x1E6876a6C2757de611c9F12B23211dBaBd1C9028"
  const owner = "0x1663fcb2f6566723a4c429f8ed34352726680f9a"

  const start = 1462849200 // 10/04/2016
  const cliff = 34145829 // ~1 yr
  const duration = 136583317 // ~4yrs

  deployer.deploy(MyVesting, beneficiary, start, cliff, duration, true);
  deployer.deploy(SimpleToken, { from: owner });
};
