pragma solidity ^0.5.0;

contract SafeMath {

    function safeAdd(uint a, uint b) public pure returns (uint c) {
        c = a + b;
        require(c >= a, "Invalid input");
    }

    function safeSub(uint a, uint b) public pure returns (uint c) {
        require(b <= a, "Invalid input");
        c = a - b;
    }

    function safeMul(uint a, uint b) public pure returns (uint c) {
        c = a * b;
        require(a == 0 || c / a == b, "Invalid input");
    }

    function safeDiv(uint a, uint b) public pure returns (uint c) {
        require(b > 0, "Invalid input");
        c = a / b;
    }
}

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

contract VotingOrganization is SafeMath {
    string orgtitle;
    string orgdescription;
    address admin;
    uint proposalCount;
    address[] boardMembersList;
    address[] delegatesList;
    Proposal[] proposals;
    VotableToken targetCoin;

    mapping(address => bool) boardMembers;
    mapping(address => Delegate) delegates;

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
        uint finalVotesFor;
        uint finalTokensFor;
        uint finalVotesAgainst;
        uint finalTokensAgainst;
        uint finalVotesAbstain;
        uint finalTokensAbstain;
    }

    struct Voter {
        uint value;
        bool voted;
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
        proposalCount = 0;
        orgtitle = _orgtitle;
        orgdescription = _orgdescription;
        boardMembers[admin] = true;
        boardMembersList.push(admin);
    }

    modifier onlyBoardMember() {
        require(boardMembers[msg.sender] == true, "You must be a board member");
        _;
    }

    function setTargetCoin(address coin) public {
        targetCoin = VotableToken(coin);
    }

    function createProposal(string memory title, string memory description, uint endBlock) public returns(uint) {
        Proposal memory proposal;
        uint proposalId = proposalCount;
        proposal.title = title;
        proposal.description = description;
        proposal.endBlock = endBlock;
        proposal.creator = msg.sender;
        proposal.proposalState = ProposalState.Open;
        proposals.push(proposal);
        proposalCount = safeAdd(proposalCount, 1);
        emit Open(proposalId);
        return proposalId;
    }

    function getProposalCount() public view returns(uint) {
        return proposalCount;
    }

    function fetchProposal(
        uint _proposalId
    ) 
        public
        view
        returns
    (
        uint proposalId,
        string memory title,
        string memory description,
        uint endBlock,
        address creator,
        uint proposalState,
        uint numVoters
    )
    {
        Proposal storage proposal = proposals[_proposalId];
        return
        (
            proposal.proposalId,
            proposal.title,
            proposal.description,
            proposal.endBlock,
            proposal.creator,
            uint(proposal.proposalState),
            proposal.votersAddress.length
        );
    }

    function isPastEndBlock(uint proposalId) public view returns(bool) {
        Proposal storage proposal = proposals[proposalId];
        return block.number >= proposal.endBlock;
    }

    function vote(uint proposalId, uint voteValue) public returns(bool) {
        Proposal storage proposal = proposals[proposalId];
        require(voteValue == 1 || voteValue == 2 || voteValue == 3, "Invalid vote value");
        require(proposal.proposalState == ProposalState.Open, "The proposal is not open");
        require(isPastEndBlock(proposalId) == false, "The proposal has passed end block");
        
        if (proposal.voters[msg.sender].voted == false) {
            proposal.votersAddress.push(msg.sender);
        }

        proposal.voters[msg.sender].value = voteValue;
        proposal.voters[msg.sender].voted = true;
        
        emit Voted(proposalId);
    }

    function getVoteCount (
        uint proposalId
    )
        public
        view
        returns
    (
        uint votesFor,
        uint tokensFor,
        uint votesAgainst,
        uint tokensAgainst,
        uint votesAbstain,
        uint tokensAbstain
    )
    {
        Proposal storage proposal = proposals[proposalId];
        for (uint i = 0; i < proposal.votersAddress.length; i++) {
            address who = proposal.votersAddress[i];
            Voter storage v = proposal.voters[who];

            if (v.value == 1) {
                votesFor = safeAdd(votesFor, 1);
                tokensFor = safeAdd(tokensFor, getTokenBalance(who));
            }

            if (v.value == 2) {
                votesAgainst = safeAdd(votesAgainst, 1);
                tokensAgainst = safeAdd(tokensAgainst, getTokenBalance(who));
            }

            if (v.value == 3) {
                votesAbstain = safeAdd(votesAbstain, 1);
                tokensAbstain = safeAdd(tokensAbstain, getTokenBalance(who));
            }
        
        }
        for (uint i = 0; i < delegatesList.length; i++) {
            address who = delegatesList[i];

            if (proposal.voters[who].voted == true )
                continue;
            address delegatedTo = delegates[who].to;
            Voter memory delegated_voter = proposal.voters[delegatedTo];

            if (delegated_voter.voted = false)
                continue;
            if (delegated_voter.value == 1)
            {
                votesFor = safeAdd(votesFor, 1);
                tokensFor = safeAdd(tokensFor, getTokenBalance(who));
            }
            if (delegated_voter.value == 2)
            {
                votesAgainst = safeAdd(votesAgainst, 1);
                tokensAgainst = safeAdd(tokensAgainst, getTokenBalance(who));
            }
            if (delegated_voter.value == 3)
            {
                votesAbstain = safeAdd(votesAbstain, 1);
                tokensAbstain = safeAdd(tokensAbstain, getTokenBalance(who));
            }
        }
    }

    function isBoardMember(address who) public view returns(bool) {
        if (boardMembers[who] == true) {
            return true;
        }
    }

    function getVoterVote(address who, uint proposalId) public view returns(uint) {
        Proposal storage proposal = proposals[proposalId];
        return proposal.voters[who].value;
    }

    function getTokenBalance(address who) public view returns(uint) {
        return targetCoin.balanceOf(who);
    }

    function addBoardMember(address who) public onlyBoardMember() returns(bool) {
        require(isBoardMember(who) == false, "The user is already a board member");
        boardMembers[who] = true;
        boardMembersList.push(who);
        return true;
    }

    function removeBoardMember(address who) public onlyBoardMember() returns(bool) {
        bool exists = false;
        uint index = 0;
        for (uint i = 0; i < boardMembersList.length; i++) {
            if (boardMembersList[i] == who)
            {
                index = i;
                exists = true;
            }
        }
        require(exists, "The user is not on the list of board members");
        boardMembersList[index] = boardMembersList[boardMembersList.length - 1];
        delete boardMembersList[boardMembersList.length - 1];
        boardMembersList.length--;
        boardMembers[who] = false;
        return true;
    }

    function submitResults(
        uint proposalId,
        uint votesFor,
        uint tokensFor,
        uint votesAgainst,
        uint tokensAgainst,
        uint votesAbstain,
        uint tokensAbstain,
        ProposalState proposalState
    )
        public 
        onlyBoardMember()
        returns(bool) 
    {
        Proposal storage proposal = proposals[proposalId];
        require(isPastEndBlock(proposalId), "The vote has not ended");
        proposal.finalVotesFor = votesFor;
        proposal.finalTokensFor = tokensFor;
        proposal.finalVotesAgainst = votesAgainst;
        proposal.finalTokensAgainst = tokensAgainst;
        proposal.finalVotesAbstain = votesAbstain;
        proposal.finalTokensAbstain = tokensAbstain;
        proposal.proposalState = proposalState;

        if (proposalState == ProposalState.Passed) {
            emit Passed(proposalId);
        }

        if (proposalState == ProposalState.Against) {
            emit Against(proposalId);
        }

        if (proposalState == ProposalState.Forced) {
            emit Forced(proposalId);
        }

        if (proposalState == ProposalState.Rejected) {
            emit Rejected(proposalId);
        }
    }

    function setDelegate(address who) public {
        if (delegates[msg.sender].delegated == false)
        {
            delegatesList.push(msg.sender);
        }
        delegates[msg.sender].delegated = true;
        delegates[msg.sender].to = who;
    }

    function removeDelegate() public {
        require(delegates[msg.sender].delegated == true, "You do not have a delegate");
        bool exists = false;
        uint index = 0;
        for (uint i = 0; i < delegatesList.length; i++) {
            if (delegatesList[i] == msg.sender)
            {
                index = i;
                exists = true;
            }
        }
        require(exists, "The user is not on the list of delegates");
        delegatesList[index] = delegatesList[delegatesList.length - 1];
        delete delegatesList[delegatesList.length - 1];
        delegatesList.length--;
        delegates[msg.sender].delegated = false;
        delegates[msg.sender].to = address(0);
    }

    function getOrgDetails() public view returns(string memory title, string memory description) {
        return (orgtitle, orgdescription);

    }


}