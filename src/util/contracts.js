import TruffleContract from "truffle-contract";
import VotingOrganizationFactory from "../../build/contracts/VotingOrganizationFactory.json";
import VotingOrganization from "../../build/contracts/VotingOrganization.json";
import VoteCoinFactory from "../../build/contracts/VoteCoinFactory.json";
import VoteCoin from "../../build/contracts/VoteCoin.json";

window.artifacts = {
  VotingOrganizationFactory: VotingOrganizationFactory,
<<<<<<< HEAD
  VotingOrganization: VotingOrganization, 
=======
  VotingOrganization: VotingOrganization,
  VoteCoinFactory: VoteCoinFactory,
  VoteCoin: VoteCoin
>>>>>>> f6ed00b695927860f3449d3aa21a707e5c459c02
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
