pragma solidity ^0.5.0;

contract VotableToken {
    function balanceOf(address) public view returns(uint);
}

contract VotingOrganizationFactory {
    address[] contracts;

    function getContractCount() public view returns(uint) {
        return contracts.length;
    }

    function newVotingOrganization(string memory _title, string memory _description) public returns(address newContract) {
        VotingOrganization w = new VotingOrganization(_title, _description);
        contracts.push(address(w));
        return address(w);
    }

    function getContractAddressByIndex(uint index) public view returns(address) {
        return contracts[index];
    }
}

contract VotingOrganization {
    string orgtitle;
    string orgdescription;
    address admin;
    uint proposalCount;
    address[] boardMembersList;
    address[] delegatesList;
    Proposal[] proposals;

    mapping(address => bool) boardMembers;
    mapping(address => bool) delegates;

    enum ProposalState {
        Open,
        Passed,
        Against,
        Forced,
        Rejected,
        Voted
    }

    struct Proposal {
        uint proposalId;
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

    event Open(uint indexed proposalId);
    event Passed(uint indexed proposalId);
    event Against(uint indexed proposalId);
    event Forced(uint indexed proposalId);
    event Rejected(uint indexed proposalId);
    event Voted(uint indexed proposalId);
    event Delegated(address voter);

    constructor(string memory _orgtitle, string memory _orgdescription) public {
        admin = msg.sender;
        orgtitle = _orgtitle;
        orgdescription = _orgdescription;
        boardMembers[msg.sender] = true;
        boardMembersList.push(msg.sender);
    }

    function createProposal(string memory title, string memory description, uint endBlock) public returns(uint) {
        Proposal memory proposal;
        proposal.proposalId = proposalCount;

    }


}