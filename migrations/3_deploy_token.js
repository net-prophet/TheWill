var Token = artifacts.require("./audball.sol");

module.exports = function(deployer) {
  deployer.deploy(Token);
};
