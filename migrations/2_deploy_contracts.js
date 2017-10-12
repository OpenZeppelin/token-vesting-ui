const MyVesting = artifacts.require("TokenVesting");
const SimpleToken = artifacts.require("SimpleToken");

module.exports = function(deployer) {
  let testrpc = '0x1663fcb2f6566723a4c429f8ed34352726680f9a'
  let metamask = "0x1E6876a6C2757de611c9F12B23211dBaBd1C9028"

  let start = 1462849200 // 10/04/2016
  let cliff = 34145829 // ~1 yr
  let duration = 136583317 // ~4yrs

  // MyVesting is TokenVesting(address _beneficiary, uint256 _start, uint256 _cliff, uint256 _duration, bool _revocable)
  deployer.deploy(SimpleToken, { from: testrpc });
  deployer.deploy(MyVesting, metamask, start, cliff, duration, true, { from: metamask });
};
