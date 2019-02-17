import TruffleContract from "truffle-contract";
import VotingOrganizationFactory from "../../build/contracts/VotingOrganizationFactory.json";
import VotingOrganization from "../../build/contracts/VotingOrganization.json";

window.artifacts = {
  VotingOrganizationFactory: VotingOrganizationFactory,
  VotingOrganization: VotingOrganization, 
};

export function getContractAt(name, at) {
  const ContractFactory = window.web3.eth.contract(window.artifacts[name].abi);
  const contract = ContractFactory.at(at);
  contract.address = at;
  window.contracts = window.contracts || {};
  window.contracts[name] = contract;
  return contract;
}

export function getContract(name) {
  const contract = TruffleContract(window.artifacts[name]);
  contract.setProvider(window.web3.currentProvider);
  return contract;
}
