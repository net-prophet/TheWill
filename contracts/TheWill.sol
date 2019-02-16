pragma solidity ^0.5.0;

contract VotableToken {
    function balanceOf(address) public view returns(uint);
}

contract VotingOrganizationFactory {
    address[] contracts;

    function getContractCount() public view returns(uint) {
        return contracts.length;
    }

    function newVotingOrganization() public returns(address newContract) {
        VotingOrganization w = new VotingOrganization();
        contracts.push(address(w));
        return address(w);
    }

    function getContractAddressByIndex(uint index) public view returns(address) {
        return contracts[index];
    }
}

contract VotingOrganization {
    
    uint proposalCount;
    address[] boardMembersList;
    address[] delegatesList;
    Proposal[] proposals;

    enum ProposalState {
        Open,
        Passed,
        Against,
        Forced,
        Rejected,
        Voted
    }

    struct Proposal {
        string title;
        string description;
        uint endBlock;
        address creator;
        ProposalState proposalState;
        mapping(address => Voter) voters;
        address[] votersAddress;
    }

    struct Voter {
        uint value;
        bool vated;
    }

    struct Delegate {
        address to;
        bool delegated;
    }


}