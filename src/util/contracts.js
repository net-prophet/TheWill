import TruffleContract from "truffle-contract";
import VotingOrganizationFactory from "../../build/contracts/VotingOrganizationFactory.json";
import VotingOrganization from "../../build/contracts/VotingOrganization.json";

const artifacts = {
  VotingOrganizationFactory: VotingOrganizationFactory,
  VotingOrganization: VotingOrganization
};

console.log("Setting contract getter");
export function getContractAt(name, at) {
  const contract = new window.web3.eth.contract(artifacts[name].abi, at);
  contract.address = at;
  return contract;
}

export function getContract(name) {
  const contract = TruffleContract(artifacts[name]);
  contract.setProvider(window.web3.currentProvider);
  return contract;
}
