var VotingOrganizationFactory = artifacts.require("./VotingOrganizationFactory.sol");
var VoteCoinFactory = artifacts.require("./VoteCoinFactory.sol");
var VoteCoin = artifacts.require("./VoteCoin.sol");
var VotingOrganization = artifacts.require("./VotingOrganization.sol");

module.exports = function(deployer) {
  deployer.deploy(VotingOrganizationFactory);
  deployer.deploy(VoteCoinFactory);
  deployer.deploy(VotingOrganization, "title", "description");
  deployer.deploy(VoteCoin, "TEST", "TEST", 0, false, 1);
};
