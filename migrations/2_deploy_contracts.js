const MyVesting = artifacts.require("TokenVesting");
const SimpleToken = artifacts.require("SimpleToken");

module.exports = function(deployer) {
  let testrpc = '0x1663fcb2f6566723a4c429f8ed34352726680f9a'
  let metamask = "0x881004772bd8C091095d2Ff5aa6Dc9995059313A"
  // MyVesting is TokenVesting(address _beneficiary, uint256 _start, uint256 _cliff, uint256 _duration, bool _revocable)
  deployer.deploy(SimpleToken, { from: testrpc });
  deployer.deploy(MyVesting, metamask, 123, 124, 321, true);
};
